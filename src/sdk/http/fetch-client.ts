import { HttpClient, IAuthorizationToken } from './http-client';
import { Readable } from 'stream';
import { CancellationToken } from '../';

function toFormData(options: any): string {
	return Object.keys(options).map((key) => {
		return encodeURIComponent(key) + '=' + encodeURIComponent(options[key]);
	}).join('&');
}

export type FetchApi = (url: string, request: any) => Promise<any>;

export class FetchHttpClient extends HttpClient<any, any> {
	constructor(
		private fetch: FetchApi,
		private formDataType: any,
		baseAddress: string,
		token: IAuthorizationToken,
		site: string = null) {
		super(baseAddress, token, site);
	}

	protected async executeJsonRequest(req: any, callback: (err: any, response?: any, body?: string) => void, token?: CancellationToken) {
		if (token) {
			const controller = new AbortController();
			token.onCancel(() => controller && controller.abort());
			req.signal = controller.signal;
		}
		if (!req.headers) {
			req.headers = {};
		}
		req.headers['Accept'] = 'application/json';

		if (!(req.body instanceof this.formDataType)) {
			req.headers['Content-Type'] = 'application/json';
		}

		const form = req.form;
		if (form) {
			delete req.form;
			req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			req.body = toFormData(form);
		}

		const url = req.url;
		delete req.url;

		try {
			const response = await this.fetch(url, req);
			const body = await response.text();
			callback(null, response, body);
		} catch (e) {
			callback(e);
		}
	}
	
	protected getStatusCode(response: any): number {
		return response.status;
	}
	
	async download(path: string, handler: (fileName: string, output: Readable) => Promise<any>, token?: CancellationToken) {
		return await new Promise(async (resolve, reject) => {
			try {
				const options: any = await this.getOptions(path, {method: 'GET'});
				const url = options.url;
				delete options.url;

				if (token) {
					const controller = new AbortController();
					token.onCancel(() => controller && controller.abort());
					options.signal = controller.signal;
				}
				const response = await this.fetch(url, options);
				let __this = this;
				
				if (response.status >= 400) {
					reject(new Error('The requested path could not be retrieved from the server.'));
					return;
				}
				return resolve(handler(__this.parseContentDispositionHeader(response.headers), response.body));
				
			} catch (e) {
				reject(e);
			}
		});
	}
}
