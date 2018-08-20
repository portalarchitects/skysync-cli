import { Readable } from 'stream';
import * as qs from 'querystring';

const API_VERSION = 'v1';

export interface IAuthorizationToken {
	resource?: string;
	offline?: boolean;
	scope?: string;
	username?: string;
	password?: string;
	accessToken?: string;
	refreshToken?: string;
	onTokenUpdated?: (rawToken: any) => void;
	onTokenInvalid?: () => void;
}

export interface IHttpClient {
	isLoggedIn: boolean;

	authenticate(): Promise<any>;

	logout(): Promise<any>;

	getAccessToken(): Promise<string>;

	get(path: string, params?: any): Promise<any>;

	download(path: string, handler: (fileName: string, output: Readable) => Promise<any>): Promise<any>;
	
	post(path: string, body: any, params?: any): Promise<any>;

	put(path: string, body: any, params?: any): Promise<any>;

	patch(path: string, body: any, params?: any): Promise<any>;

	delete(path: string, params?: any): Promise<boolean>;
}

function isValidToken(token: IAuthorizationToken): boolean {
	if (Boolean(token)) {
		if (Boolean(token.username && token.password)) {
			return true;
		}
		if (Boolean(token.accessToken) || Boolean(token.refreshToken)) {
			return true;
		}
	}
	return false;
}

function getTokenRequestParameters(token: IAuthorizationToken): any {
	if (Boolean(token.refreshToken)) {
		return {
			grant_type: 'refresh_token',
			refresh_token: token.refreshToken
		};
	}
	if (Boolean(token.username)) {
		return {
			grant_type: 'password',
			username: token.username,
			password: token.password
		};
	}
	return null;
}

function invalidTokenError() {
	return new Error('Could not acquire a valid access token.');
}

function removeUndefinedParameters(params?: any): any {
	let filteredParams;
	for (const param in params) {
		if (params[param] !== undefined) {
			if (!filteredParams) {
				filteredParams = {};
			}
			filteredParams[param] = params[param];
		}
	}
	return filteredParams;
}

export abstract class HttpClient<TRequest, TResponse> implements IHttpClient {
	private accessToken: string;
	private lastAccessToken: any;
	private readonly scope: string;
	private readonly apiUrl: string;
	private readonly isAuthRequired: boolean;

	constructor(
		protected baseAddress: string,
		private token: IAuthorizationToken,
		site: string = null) {
		if (!this.isAllowCustomBaseAddress() || !this.baseAddress || this.baseAddress.length === 0) {
			this.baseAddress = this.getDefaultBaseAddress();
		}

		if (this.baseAddress[this.baseAddress.length - 1] !== '/') {
			this.baseAddress += '/';
		}
		this.isAuthRequired = isValidToken(this.token);
		this.accessToken = this.isAuthRequired ? (this.token && this.token.accessToken) : null;
		this.lastAccessToken = null;

		this.scope = this.token && this.token.scope || '';

		if (site && site.length > 0) {
			this.apiUrl = `${this.baseAddress}${API_VERSION}/sites/${site}/api/`;
		} else {
			this.apiUrl = `${this.baseAddress}${API_VERSION}/`;
		}
	}

	static getUrl(requestPath: string, baseUrl?: string, params?: any): string {
		if (baseUrl && baseUrl.length > 0 && requestPath.indexOf('://') === -1) {
			requestPath = baseUrl + requestPath;
		}
		if (params) {
			params = removeUndefinedParameters(params);
		}
		if (params) {
			const hasExisting = requestPath.indexOf('?') !== -1;
			requestPath = `${requestPath}${hasExisting ? '&' : '?'}${qs.stringify(params)}`;
		}
		return requestPath;
	}

	get isLoggedIn(): boolean {
		return !this.isAuthRequired || Boolean(this.accessToken);
	}

	async authenticate(): Promise<any> {
		const last = this.lastAccessToken;
		await this.getAccessToken();
		if (last === this.lastAccessToken && this.lastAccessToken !== null && Boolean(this.token && this.token.onTokenUpdated)) {
			// if we didn't have to update the token, then just notify any listeners
			this.token.onTokenUpdated(last);
		}
	}

	async logout(): Promise<any> {
		return await new Promise<any>(resolve => {
			if (this.isLoggedIn) {
				this.executeJsonRequest(<any>{
					url: HttpClient.getUrl('connect/token', this.baseAddress),
					method: 'GET',
					headers: {
						'Accept': 'application/json'
					}
				}, resolve);
			} else {
				resolve();
			}
		});
	}

	async getAccessToken(): Promise<string> {
		if (this.isAuthRequired && !this.accessToken) {
			return await new Promise<string>((resolve, reject) => {
				if (this.accessToken) {
					return resolve(this.accessToken);
				}

				const offlineScope = Boolean(this.token.offline) ? ' offline_access' : '';
				const userScope = this.scope.length > 0 ? ` ${this.scope}` : '';
				const tokenParameters = getTokenRequestParameters(this.token);
				if (!tokenParameters) {
					if (Boolean(this.token.onTokenInvalid)) {
						this.token.onTokenInvalid();
					}
					return reject(invalidTokenError());
				}

				this.executeJsonRequest(<any>{
					url: HttpClient.getUrl('connect/token', this.baseAddress),
					method: 'POST',
					form: {
						...tokenParameters,
						scope: `profile roles${offlineScope}${userScope}`
					}
				}, (err, response, body) => {
					if (!err) {
						err = this.getError(err, response, body);
					}
					if (err) {
						this.lastAccessToken = null;
						if (Boolean(this.token.onTokenInvalid)) {
							this.token.onTokenInvalid();
						}
						return reject(err);
					}

					const rawToken = JSON.parse(body);
					this.accessToken = rawToken.access_token;
					this.lastAccessToken = rawToken;
					if (Boolean(this.token.onTokenUpdated)) {
						this.token.onTokenUpdated(rawToken);
					}
					resolve(this.accessToken);
				});
			});
		}
		return Promise.resolve(this.accessToken);
	}

	protected abstract isAllowCustomBaseAddress(): boolean;

	protected abstract getDefaultBaseAddress(): string;

	protected abstract executeJsonRequest(req: TRequest, callback: (err: any, response: TResponse, body: string) => void);

	protected abstract getStatusCode(response: TResponse): number;

	private getError(err, response: TResponse, body: string) {
		if (err) {
			return err;
		}
		
		const statusCode = response && this.getStatusCode(response);
		if (statusCode === 404 || statusCode === 406) {
			return null;
		}
		if (statusCode >= 200 && statusCode <= 299) {
			return null;
		}

		let result = body && JSON.parse(body);
		if (result && result.errors && result.errors.length > 0) {
			result = result.errors[0];
		}
		return new Error((result && (result.description || result.error_description)) || 'An unknown error occurred');
	}

	private async executeApiRequest(path: string, params: any, options: any = {}): Promise<any> {
		const url = HttpClient.getUrl(path, this.apiUrl, params);
		return await new Promise(async (resolve, reject) => {
			try {
				if (this.isAuthRequired) {
					const token = await this.getAccessToken();
					options.headers = options.headers || {};
					options.headers['Authorization'] = `Bearer ${token}`;
				}

				const processResponse = (err, response, body) => {
					err = this.getError(err, response, body);
					if (err) {
						return reject(err);
					}

					if (response && this.getStatusCode(response) === 401) {
						this.lastAccessToken = null;
						if (Boolean(this.token.onTokenInvalid)) {
							this.token.onTokenInvalid();
						}
						return reject(invalidTokenError());
					}

					if (response && this.getStatusCode(response) === 404) {
						return resolve(null);
					}

					const jsonResponse = !response.headers || !response.headers['content-type'] || response.headers['content-type'].indexOf('application/json') >= 0;
					if (!body || body.length === 0) {
						return resolve(jsonResponse ? {} : '');
					}
					return resolve(jsonResponse ? JSON.parse(body) : body);
				};

				let attempted = false;
				options.url = url;
				this.executeJsonRequest(options, async (err, response, body) => {
					try {
						if (response && this.getStatusCode(response) === 401 && this.isAuthRequired) {
							if (!attempted) {
								attempted = true;

								this.accessToken = null;
								const token = await this.getAccessToken();
								options.url = url;
								options.headers['Authorization'] = `Bearer ${token}`;
								return this.executeJsonRequest(options, processResponse);
							}
						}

						return processResponse(err, response, body);
					} catch (e) {
						reject(e);
					}
				});
			} catch (e) {
				reject(e);
			}
		});
	}

	abstract async download(path: string, handler: (fileName: string, output: Readable) => Promise<any>);
	
	protected async getOptions(path: string, options: any) {
		if (this.isAuthRequired) {
			const token = await this.getAccessToken();
			options.headers = options.headers || {};
			options.headers['Authorization'] = `Bearer ${token}`;
		}

		options.url = HttpClient.getUrl(path, this.apiUrl);
		return options;
	}
	
	protected parseContentDispositionHeader(headers: any): string {
		let contentDisposition = headers['content-disposition'];
		if (!contentDisposition) {
			return undefined;
		}
		let fileNameItem = contentDisposition.split(';').filter(item => item.trim().toLowerCase().startsWith('filename=')).shift();
		if (!fileNameItem) {
			return undefined;
		}
		return fileNameItem.split('=').pop();
	}
	
	get(path: string, params?: any): Promise<any> {
		return this.executeApiRequest(path, params, {
			method: 'GET',
			encoding: 'utf-8'
		});
	}

	private executePost(method: string, path: string, body: any, params?: any): Promise<any> {
		return this.executeApiRequest(path, params, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			encoding: 'utf-8',
			body: body && JSON.stringify(body) || ''
		});
	}

	post(path: string, body: any, params?: any): Promise<any> {
		return this.executePost('POST', path, body, params);
	}

	put(path: string, body: any, params?: any): Promise<any> {
		return this.executePost('PUT', path, body, params);
	}

	patch(path: string, body: any, params?: any): Promise<any> {
		return this.executePost('PATCH', path, body, params);
	}

	async delete(path: string, params?: any): Promise<boolean> {
		const result = await this.executeApiRequest(path, params, {
			method: 'DELETE'
		});
		return result !== null;
	}
}
