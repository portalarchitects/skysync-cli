import 'mocha';
import expect = require('expect.js');
import { HttpClient } from './http-client';
import { TestHttpClient } from './test-client';

// eslint:disable:no-http-string

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

		it('can get qualified url with single parameter', () => {
			const params = {
				foo: 'fooParameter'
			};
			const url = HttpClient.getUrl('http://localhost:8000/v1/connections', 'http://localhost:9090/', params);
			expect(url).to.eql('http://localhost:8000/v1/connections?foo=fooParameter');
		});

		it('can get qualified url with multiple parameters', () => {
			const params = {
				foo: 'fooParameter',
				bar: 'barParameter',
				baz: 'bazParameter'
			};
			const url = HttpClient.getUrl('http://localhost:8000/v1/connections', 'http://localhost:9090/', params);
			expect(url).to.eql('http://localhost:8000/v1/connections?foo=fooParameter&bar=barParameter&baz=bazParameter');
		});
		
		it('can get qualified url with filtered parameters', () => {
			const params = {
				foo: undefined,
				bar: 'barParameter',
				baz: 'bazParameter'
			};
			const url = HttpClient.getUrl('http://localhost:8000/v1/connections', 'http://localhost:9090/', params);
			expect(url).to.eql('http://localhost:8000/v1/connections?bar=barParameter&baz=bazParameter');
		});
		
		it('should handle request path that has existing query string', () => {
			const params = {
				foo: undefined,
				bar: 'barParameter',
				baz: 'bazParameter'
			};
			const url = HttpClient.getUrl('http://localhost:8000/v1/connections?active=1', 'http://localhost:9090/', params);
			expect(url).to.eql('http://localhost:8000/v1/connections?active=1&bar=barParameter&baz=bazParameter');
		});
	});

	it('should remove "headers" param and merge with request', () => {
		const httpClient = new TestHttpClient();
		httpClient.get('connections/123', {
			active: 1,
			headers: {
				'X-Connect-As': 'foobar'
			}
		});
		const lastRequest = httpClient.executedRequests[0];
		expect(lastRequest.url).to.eql('http://localhost:9090/v1/connections/123?active=1');
		expect(lastRequest.headers).to.eql({
			'X-Connect-As': 'foobar'
		});
	});
});
