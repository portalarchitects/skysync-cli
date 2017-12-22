import { HttpClient, IAuthorizationToken } from './http-client';
import * as request from 'request';
import { Readable } from 'stream';

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

	protected executeJsonRequest(req: any, callback: (err: any, response: any, body: string) => void) {
		request(req, callback);
	}
	
	protected getStatusCode(response: any): number {
		return response.statusCode;
	}
	
	async download(path: string, handler: (fileName: string, output: Readable) => Promise<any>) {
		return await new Promise(async (resolve, reject) => {
			try {
				const options: any = await this.getOptions(path, {method: 'GET'});
				const response = await request.get(options);
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
