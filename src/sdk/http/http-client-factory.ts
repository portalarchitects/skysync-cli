import { IHttpClient, IAuthorizationToken } from './http-client';
import { FetchHttpClient, FetchApi } from './fetch-client';

declare const window: any;
declare const WorkerGlobalScope: any;
declare const global: any;

function getFetch(): FetchApi {
	return (function(g: any) {
		let f = g?.fetch;
		if (!f) {
			f = g.require('node-fetch').fetch;
		}
		return f;
	})((typeof window !== 'undefined'
		? window
		: typeof WorkerGlobalScope !== 'undefined'
			? self
			// tslint:disable-next-line:function-constructor
			: typeof global !== 'undefined' ? global : Function('return this;')));
}

export function createHttpClient(baseAddress?: string, token?: IAuthorizationToken, site?: string): IHttpClient {
	return new FetchHttpClient(getFetch(), baseAddress, token, site);
}
