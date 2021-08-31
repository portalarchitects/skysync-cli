import { Readable } from 'stream';
import { stringify } from 'querystring';
import { CancellationToken } from '../cancellation-token';

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

	shouldPost(path: string, params: any): boolean;

	authenticate(): Promise<any>;

	logout(): Promise<any>;

	getAccessToken(): Promise<string>;

	get(path: string, params?: any, token?: CancellationToken): Promise<any>;

	download(path: string, handler: (fileName: string, output: Readable) => Promise<any>, token?: CancellationToken): Promise<any>;

	upload(path: string, name: string, body: Buffer | FormData, params?: any, token?: CancellationToken): Promise<any>;

	post(path: string, body: any, params?: any, token?: CancellationToken): Promise<any>;

	put(path: string, body: any, params?: any, token?: CancellationToken): Promise<any>;

	patch(path: string, body: any, params?: any, token?: CancellationToken): Promise<any>;

	delete(path: string, params?: any, token?: CancellationToken): Promise<boolean>;
}

export class HttpError extends Error {
	constructor (message, public status, public errors?) {
		super(message);
		this.name = this.constructor.name;

		if (Error.captureStackTrace) {
			// Chrome and NodeJS
			Error.captureStackTrace(this, this.constructor);
		} else {
			// FF, IE 10+ and Safari 6+. Fallback for others
			this.stack = (new Error()).stack || '';
		}

		this.status = status || 500;
	}
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
			requestPath = `${requestPath}${hasExisting ? '&' : '?'}${stringify(params)}`;
		}
		return requestPath;
	}

	get isLoggedIn(): boolean {
		return !this.isAuthRequired || Boolean(this.accessToken);
	}

	shouldPost(path: string, params: any): boolean {
		return HttpClient.getUrl(path, this.apiUrl, params).length > 2000;
	}

	async authenticate(): Promise<any> {
		const last = this.lastAccessToken;
		await this.getAccessToken();
		if (last === this.lastAccessToken && this.lastAccessToken !== null && Boolean(this.token && this.token.onTokenUpdated)) {
			// if we didn't have to update the token, then just notify any listeners
			this.token.onTokenUpdated(last);
		}
	}

	async logout(): Promise<void> {
		return await new Promise<void>(resolve => {
			if (this.isLoggedIn) {
				const revokeTokens: string = [this.token.accessToken, this.token.refreshToken].filter(Boolean).join(',');
				this.executeJsonRequest(<any>{
					url: HttpClient.getUrl('connect/logout', this.baseAddress),
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${this.token.accessToken}`,
						'Accept': 'application/json',
						'Revoke-Tokens': revokeTokens
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

	protected abstract executeJsonRequest(req: TRequest, callback: (err: any, response: TResponse, body: string) => void, token?: CancellationToken);

	protected abstract getStatusCode(response: TResponse): number;
	
	protected abstract getHeadersValue(headers: any, key: string): string;

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

		const result = body && JSON.parse(body);
		const error = result && result.errors && result.errors.length > 0
			? result.errors[0]
			: result;

		const message = (error && (error.description || error.error_description)) || 'An unknown error occurred';
		return new HttpError(message, statusCode, result && result.errors);
	}

	private executeApiRequest(path: string, params: any, options: any = {}, token: CancellationToken): Promise<any> {
		let headers, requestParams;
		if (params) {
			({ headers, ...requestParams } = params);
		}

		if (headers) {
			options.headers = headers;
		}

		const url = HttpClient.getUrl(path, this.apiUrl, requestParams);
		return new Promise(async (resolve, reject) => {
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

					const contentType = response.headers && this.getHeadersValue(response.headers, 'content-type');
					const jsonResponse = !contentType || contentType.indexOf('application/json') >= 0;
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
								const accessToken = await this.getAccessToken();
								options.url = url;
								options.headers['Authorization'] = `Bearer ${accessToken}`;
								return this.executeJsonRequest(options, processResponse, token);
							}
						}

						return processResponse(err, response, body);
					} catch (e) {
						reject(e);
					}
				}, token);
			} catch (e) {
				reject(e);
			}
		});
	}

	abstract download(path: string, handler: (fileName: string, output: Readable) => Promise<any>, token?: CancellationToken);

	upload(path: string, name: string, body: Buffer | FormData, params?: any, token?: CancellationToken): Promise<any> {
		const options = {
			method: 'POST',
			...(body instanceof FormData && {
				body: body
			} || {
				formData : {
					file: {
						value: body,
						options: {
							filename: name,
							contentType: 'application/octet-stream'
						}
					}
				}
			})
		};

		return this.executeApiRequest(path, params, options, token);
	}

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
		let contentDisposition = this.getHeadersValue(headers, 'content-disposition');
		if (!contentDisposition) {
			return undefined;
		}
		let fileNameItem = contentDisposition.split(';').filter(item => item.trim().toLowerCase().startsWith('filename=')).shift();
		if (!fileNameItem) {
			return undefined;
		}
		return fileNameItem.split('=').pop();
	}
	
	get(path: string, params?: any, token?: CancellationToken): Promise<any> {
		return this.executeApiRequest(path, params, {
			method: 'GET',
			encoding: 'utf-8'
		}, token);
	}

	private executePost(method: string, path: string, body: any, params?: any, token?: CancellationToken): Promise<any> {
		return this.executeApiRequest(path, params, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			encoding: 'utf-8',
			body: body && JSON.stringify(body) || ''
		}, token);
	}

	post(path: string, body: any, params?: any, token?: CancellationToken): Promise<any> {
		return this.executePost('POST', path, body, params, token);
	}

	put(path: string, body: any, params?: any, token?: CancellationToken): Promise<any> {
		return this.executePost('PUT', path, body, params, token);
	}

	patch(path: string, body: any, params?: any, token?: CancellationToken): Promise<any> {
		return this.executePost('PATCH', path, body, params, token);
	}

	async delete(path: string, params?: any, token?: CancellationToken): Promise<boolean> {
		const result = await this.executeApiRequest(path, params, {
			method: 'DELETE'
		}, token);
		return result !== null;
	}
}
