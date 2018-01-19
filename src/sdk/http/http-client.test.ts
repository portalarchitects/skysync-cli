import 'mocha';
import expect = require('expect.js');
import { HttpClient } from './http-client';

// tslint:disable:no-http-string

describe('HttpClient', () => {
	describe('getUrl', () => {
		it('should append base url to unqualified url', () => {
			const url = HttpClient.getUrl('v1/connections', 'http://localhost:9090/');
			expect(url).to.eql('http://localhost:9090/v1/connections');
		});

		it('can get qualified url', () => {
			const url = HttpClient.getUrl('http://localhost:8000/v1/connections', 'http://localhost:9090/');
			expect(url).to.eql('http://localhost:8000/v1/connections');
		});
	});
});
