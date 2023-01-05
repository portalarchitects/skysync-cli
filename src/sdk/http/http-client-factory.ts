import { IHttpClient, IAuthorizationToken } from './http-client';
import { FetchHttpClient, FetchApi } from './fetch-client';

declare const window: any;
declare const WorkerGlobalScope: any;
declare const global: any;

function getFetch(): {fetch: FetchApi; formDataType: any } {
	return (function(g: any) {
		let f = g?.fetch;
		let formDataType = g?.FormData;
		if (f) {
			f = f.bind(g);
		} else {
			f = module.require('node-fetch');
			formDataType = module.require('form-data');
		}
		return {
			fetch: f,
			formDataType
		};
	})((typeof window !== 'undefined'
		? window
		: typeof WorkerGlobalScope !== 'undefined'
			? self
			// eslint-disable-next-line no-new-func
			: typeof global !== 'undefined' ? global : Function('return this;')));
}

export function createHttpClient(baseAddress?: string, token?: IAuthorizationToken, site?: string): IHttpClient {
	const { fetch, formDataType } = getFetch();
	return new FetchHttpClient(fetch, formDataType, baseAddress || 'http://localhost:9090/', token, site);
}
