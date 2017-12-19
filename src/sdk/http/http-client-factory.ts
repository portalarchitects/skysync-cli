import { IHttpClient, IAuthorizationToken } from './http-client';
import { FetchHttpClient } from './fetch-client';

declare const window: any;
declare const WorkerGlobalScope: any;
declare const global: any;

function isFetchDefined(): boolean {
	return (function(g: any) {
		return g && (typeof g.fetch !== 'undefined');
	})((typeof window !== 'undefined'
		? window
		: typeof WorkerGlobalScope !== 'undefined'
			? self
			: typeof global !== 'undefined' ? global : Function('return this;')));
}

export function createHttpClient(baseAddress?: string, token?: IAuthorizationToken, site?: string): IHttpClient {
	if (!isFetchDefined()) {
		const RequestHttpClient = require('./request-client').RequestHttpClient;
		return new RequestHttpClient(baseAddress, token, site);
	}

	return new FetchHttpClient(baseAddress, token, site);
}
