export * from './http-client';
export * from './http-client-factory';

import * as qs from './query-string';

export namespace http {
	export const appendQuery = qs.appendQuery;
	export const encodeQuery = qs.encodeQuery;
	export const stripQuery = qs.stripQuery;
}
