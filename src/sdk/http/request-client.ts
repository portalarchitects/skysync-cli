import { HttpClient } from './http-client';
import * as request from 'request';

export class RequestHttpClient extends HttpClient<any, request.RequestResponse> {
	constructor(baseAddress: string, username: string, password: string, site: string = null) {
		super(baseAddress, username, password, site);
		request.defaults({
			headers: {
				'Accept': 'application/json'
			}
		});
	}

	protected makeRequest(req: any, callback: (err: any, response: request.RequestResponse, body: string) => void) {
		request(req, callback);
	}

	protected getStatusCode(response: request.RequestResponse): number {
		return response.statusCode;
	}
}
