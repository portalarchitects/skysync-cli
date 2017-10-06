import { URL } from 'url';

const API_VERSION = 'v1';

export interface IHttpClient {
	get(path: string, params?: any, csvResponse?: boolean): Promise<any>;

	post(path: string, body: any, params?: any): Promise<any>;

	put(path: string, body: any, params?: any): Promise<any>;

	patch(path: string, body: any, params?: any): Promise<any>;

	delete(path: string, params?: any): Promise<boolean>;
}

function appendParams(url: URL, params: any) {
	if (params) {
		Object.keys(params).forEach(prop => {
			const val = params[prop];
			if (typeof(val) !== 'undefined' && val !== null) {
				url.searchParams.set(prop, params[prop]);
			}
		});
	}
}

function getUrl(requestPath: string, baseUrl: string, params?: any): URL {
	const url = new URL(requestPath, baseUrl);
	appendParams(url, params);
	return url;
}

export abstract class HttpClient<TRequest, TResponse> implements IHttpClient {
	private accessToken: string;
	private readonly apiUrl: string;
	private readonly isAuthRequired: boolean;

	constructor(
		protected baseAddress: string,
		private username: string,
		private password: string,
		site: string = null) {
		if (this.baseAddress[this.baseAddress.length - 1] !== '/') {
			this.baseAddress += '/';
		}
		this.isAuthRequired = Boolean(this.username && this.password);

		if (site && site.length > 0) {
			this.apiUrl = `${this.baseAddress}${API_VERSION}/sites/${site}/api/`;
		} else {
			this.apiUrl = `${this.baseAddress}${API_VERSION}/`;
		}
	}

	protected async getAccessToken(): Promise<string> {
		if (this.isAuthRequired && !this.accessToken) {
			return await new Promise<string>((resolve, reject) => {
				if (this.accessToken) {
					return resolve(this.accessToken);
				}

				this.executeJsonRequest(<any>{
					url: getUrl('connect/token', this.baseAddress),
					method: 'POST',
					form: {
						grant_type: 'password',
						username: this.username,
						password: this.password,
						scope: 'profile roles',
						resource: this.baseAddress
					}
				}, (err, respose, body) => {
					if (err) {
						return reject(err);
					}
					this.accessToken = JSON.parse(body).access_token;
					resolve(this.accessToken);
				});
			});
		}
		return Promise.resolve(this.accessToken);
	}

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

		const error = JSON.parse(body)['errors'][0].description;
		return new Error(error);
	}

	private async executeApiRequest(path: string, params: any, options: any = {}, csvResponse: boolean = false): Promise<any> {
		return await new Promise(async (resolve, reject) => {
			try {
				if (this.isAuthRequired) {
					const token = await this.getAccessToken();
					options.headers = options.headers || {};
					options.headers['Authorization'] = `Bearer ${token}`;
				}

				options.url = getUrl(path, this.apiUrl, params);

				const processResponse = (err, response, body) => {
					err = this.getError(err, response, body);
					if (err) {
						return reject(err);
					}
					if (response && this.getStatusCode(response) === 404) {
						return resolve(null);
					}
					if (!body || body.length === 0) {
						return resolve(csvResponse ? '' : {});
					}
					return resolve(csvResponse ? body : JSON.parse(body));
				};

				let attempted = false;
				this.executeJsonRequest(options, async (err, response, body) => {
					try {
						if (response && this.getStatusCode(response) === 401 && !attempted && this.isAuthRequired) {
							attempted = true;

							this.accessToken = null;
							const token = await this.getAccessToken();
							options.headers['Authorization'] = `Bearer ${token}`;

							return this.executeJsonRequest(options, processResponse);
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

	get(path: string, params?: any, csvResponse?: boolean): Promise<any> {
		return this.executeApiRequest(path, params, {
			method: 'GET',
			encoding: 'utf-8'
		}, csvResponse);
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
