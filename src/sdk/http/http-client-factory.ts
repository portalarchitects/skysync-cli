import { IHttpClient, IAuthorizationToken } from './http-client';
import { FetchHttpClient, FetchApi } from './fetch-client';

declare const window: any;
declare const WorkerGlobalScope: any;
declare const global: any;

function getFetch(): {fetch: FetchApi; usingNodeFetch: boolean} {
	return (function(g: any) {
		let f = g?.fetch;
		let usingNodeFetch = false;
		if (f) {
			f = f.bind(g);
		} else {
			f = g.require('node-fetch').fetch;
			usingNodeFetch = true;
		}
		return {
			fetch: f,
			usingNodeFetch
		};
	})((typeof window !== 'undefined'
		? window
		: typeof WorkerGlobalScope !== 'undefined'
			? self
			// eslint-disable-next-line no-new-func
			: typeof global !== 'undefined' ? global : Function('return this;')));
}

export function createHttpClient(baseAddress?: string, token?: IAuthorizationToken, site?: string): IHttpClient {
	const { fetch, usingNodeFetch } = getFetch();
	return new FetchHttpClient(fetch, usingNodeFetch, baseAddress, token, site);
}
