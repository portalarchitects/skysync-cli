import { HttpClient } from './http-client';
import * as request from 'request';

export class RequestHttpClient extends HttpClient<any, any> {
	constructor(baseAddress: string, username: string, password: string, site: string = null) {
		super(baseAddress, username, password, site);
		request.defaults({
			headers: {
				'Accept': 'application/json'
			}
		});
	}

	protected executeJsonRequest(req: any, callback: (err: any, response: any, body: string) => void) {
		request(req, callback);
	}
	
	protected executeDownloadRequest(options:any): Promise<any> {
		return request.get(options);
	}
	
	protected getStatusCode(response: any): number {
		return response.statusCode;
	}
}
