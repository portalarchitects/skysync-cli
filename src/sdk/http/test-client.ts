import { HttpClient, IHttpClient } from './http-client';
import expect = require('expect.js');

export class TestHttpClient extends HttpClient<any, any> implements IHttpClient {
	/* eslint:disable:no-http-string */
	static readonly BASE_ADDRESS = 'http://localhost:9090';

	private readonly _executedRequests = [];
	private readonly _pendingResponses = [];

	constructor() {
		super(TestHttpClient.BASE_ADDRESS, null);
	}

	protected isAllowCustomBaseAddress(): boolean {
		return true;
	}

	protected getDefaultBaseAddress(): string {
		return TestHttpClient.BASE_ADDRESS;
	}

	get executedRequests() {
		return this._executedRequests.slice();
	}

	addPendingResponse(response) {
		this._pendingResponses.push(response);
	}
	
	protected getStatusCode(response: any): number {
		return response.statusCode;
	}

	protected executeJsonRequest(req: any, callback: (err: any, response?: any, body?: string) => void) {
		this._executedRequests.push(req);
		const response = this._pendingResponses.pop() || {statusCode: 200};
		callback(null, response, response.body || '');
	}

	expectLastRequest(req: any) {
		const lastRequest = this._executedRequests.pop();
		expect(lastRequest).to.be.a('object');
		expect(lastRequest).to.have.property('url');

		if (req.url) {
			expect(lastRequest.url.toString()).to.equal(`${TestHttpClient.BASE_ADDRESS}/${req.url}`);
		}

		expect(lastRequest).to.have.property('method', req.method);

		if (req.body) {
			const expectedBody = typeof(req.body) === 'object' ? JSON.stringify(req.body) : req.body;
			expect(lastRequest).to.have.property('body', expectedBody);
		}
	}

	download(): Promise<any> {
		return Promise.reject('Not Implemented');
	}
}
