import { HttpClient } from './http-client';
import * as request from 'request';

export class RequestHttpClient extends HttpClient<any, request.RequestResponse> {
	constructor(baseAddress: string, username: string, password: string) {
		super(baseAddress, username, password);
		request.defaults({
			headers: {
				'Accept': 'application/json'
			}
		});
	}

	protected makeRequest(req: any, callback: (err: any, response: request.RequestResponse, body: string) => void) {
		req.baseUrl = this.baseAddress;
		request(req, callback);
	}

	protected getStatusCode(response: request.RequestResponse): number {
		return response.statusCode;
	}
}
