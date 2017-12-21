import { HttpClient, IAuthorizationToken } from './http-client';
import { Readable } from 'stream';

declare const fetch: (url: string, request: any) => Promise<any>;

function toFormData(options: any): string {
	return Object.keys(options).map((key) => {
		return encodeURIComponent(key) + '=' + encodeURIComponent(options[key]);
	}).join('&');
}

export class FetchHttpClient extends HttpClient<any, any> {
	constructor(baseAddress: string, token: IAuthorizationToken, site: string = null) {
		super(baseAddress, token, site);
	}

	protected isAllowCustomBaseAddress(): boolean {
		return false;
	}

	protected getDefaultBaseAddress(): string {
		return '/';
	}

	protected async executeJsonRequest(req: any, callback: (err: any, response?: any, body?: string) => void) {
		if (!req.headers) {
			req.headers = {};
		}
		req.headers['Accept'] = 'application/json';
		req.headers['Content-Type'] = 'application/json';

		const form = req.form;
		if (form) {
			delete req.form;
			req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			req.body = toFormData(form);
		}

		const url = req.url;
		delete req.url;

		try {
			const response = await fetch(url, req);
			const body = await response.text();
			callback(null, response, body);
		} catch (e) {
			callback(e);
		}
	}
	
	protected getStatusCode(response: any): number {
		return response.status;
	}
	
	async download(path: string, handler: (fileName: string, output: Readable) => Promise<any>) {
		return await new Promise(async (resolve, reject) => {
			try {
				const options: any = await this.getOptions(path, {method: 'GET'});
				const url = options.url;
				delete options.url;

				const response = await fetch(url, options);
				let __this = this;
				
				response.on('response', function (response) {
					if (response.statusCode >= 400) {
						reject(new Error('The requested path could not be retrieved from the server.'));
						return;
					}
					return resolve(handler(__this.parseContentDispositionHeader(response.headers), response));
				});
			} catch (e) {
				reject(e);
			}
		});
	}
}
