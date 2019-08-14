import { HttpClient, IAuthorizationToken } from './http-client';
import * as request from 'request';
import { Readable } from 'stream';
import { CancellationToken } from '../';

export class RequestHttpClient extends HttpClient<any, any> {
	constructor(baseAddress: string, token: IAuthorizationToken, site: string = null) {
		super(baseAddress, token, site);
		request.defaults({
			headers: {
				'Accept': 'application/json'
			}
		});
	}

	protected isAllowCustomBaseAddress(): boolean {
		return true;
	}

	protected getDefaultBaseAddress(): string {
		// tslint:disable-next-line:no-http-string
		return 'http://localhost:9090/';
	}

	protected executeJsonRequest(req: any, callback: (err: any, response: any, body: string) => void, token?: CancellationToken) {
		const r = request(req, callback);
		if (token) {
			token.onCancel(() => r && r.abort());
		}
	}
	
	protected getStatusCode(response: any): number {
		return response.statusCode;
	}

	download(path: string, handler: (fileName: string, output: Readable) => Promise<any>, token?: CancellationToken) {
		return new Promise(async (resolve, reject) => {
			try {
				const options: any = await this.getOptions(path, {method: 'GET'});
				const r = request.get(options);
				if (token) {
					token.onCancel(() => r && r.abort());
				}
				const response = await r;
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
