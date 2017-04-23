import { appendQuery } from './query-string';

export interface IHttpClient {
	get(path: string, params?: any): Promise<any>;

	post(path: string, body: any, params?: any): Promise<any>;

	put(path: string, body: any, params?: any): Promise<any>;

	patch(path: string, body: any, params?: any): Promise<any>;

	delete(path: string, params?: any): Promise<boolean>;
}

export abstract class HttpClient<TRequest, TResponse> implements IHttpClient {
	private accessToken: string;
	private isAuthRequired: boolean;

	constructor(
		protected baseAddress: string,
		private username: string,
		private password: string) {
		if (this.baseAddress[this.baseAddress.length - 1] !== '/') {
			this.baseAddress += '/';
		}
		this.isAuthRequired = Boolean(this.username && this.password);
	}

	protected async getAccessToken(): Promise<string> {
		if (this.isAuthRequired && !this.accessToken) {
			return await new Promise<string>((resolve, reject) => {
				if (this.accessToken) {
					return resolve(this.accessToken);
				}

				this.makeRequest(<any>{
					url: 'connect/token',
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

	protected abstract makeRequest(req: TRequest, callback: (err: any, response: TResponse, body: string) => void);

	protected abstract getStatusCode(response: TResponse): number;

	private getError(err, response: TResponse, body: string) {
		if (err) {
			return err;
		}
		
		const statusCode = response && this.getStatusCode(response);
		if (statusCode === 404) {
			return null;
		}
		if (statusCode >= 200 && statusCode <= 299) {
			return null;
		}

		const error = JSON.parse(body)['errors'][0].description;
		return new Error(error);
	}

	private async executeRequest(path: string, params: any, options: any = {}): Promise<any> {
		return await new Promise(async (resolve, reject) => {
			try {
				if (this.isAuthRequired) {
					const token = await this.getAccessToken();
					options.headers = options.headers || {};
					options.headers['Authorization'] = `Bearer ${token}`;
				}

				options.url = appendQuery(path, params);
				options.baseUrl = this.baseAddress;

				let attempted = false;
				this.makeRequest(options, async (err, response, body) => {
					try {
						if (response && this.getStatusCode(response) === 401 && !attempted && this.isAuthRequired) {
							attempted = true;

							this.accessToken = null;
							const token = await this.getAccessToken();
							options.headers['Authorization'] = `Bearer ${token}`;

							return this.makeRequest(options, (e, r, b) => {
								e = this.getError(e, r, b);
								if (e) {
									return reject(e);
								}
								if (r && this.getStatusCode(r) === 404) {
									b = null;
								}
								if (!b || b.length === 0) {
									b = '{}';
								}
								resolve(JSON.parse(b));
							});
						}

						err = this.getError(err, response, body);
						if (err) {
							return reject(err);
						}
						if (response && this.getStatusCode(response) === 404) {
							body = null;
						}
						if (!body || body.length === 0) {
							body = '{}';
						}
						resolve(JSON.parse(body));
					} catch (e) {
						reject(e);
					}
				});
			} catch (e) {
				reject(e);
			}
		});
	}

	get(path: string, params?: any): Promise<any> {
		return this.executeRequest(path, params, {
			method: 'GET'
		});
	}

	post(path: string, body: any, params?: any): Promise<any> {
		return this.executeRequest(path, params, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body && JSON.stringify(body) || ''
		});
	}

	put(path: string, body: any, params?: any): Promise<any> {
		return this.executeRequest(path, params, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body && JSON.stringify(body) || ''
		});
	}

	patch(path: string, body: any, params?: any): Promise<any> {
		return this.executeRequest(path, params, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body && JSON.stringify(body) || ''
		});
	}

	async delete(path: string, params?: any): Promise<boolean> {
		const result = await this.executeRequest(path, params, {
			method: 'DELETE'
		});
		return result !== null;
	}
}
