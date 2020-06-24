import { PolicyItem } from '../models';
import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class PolicyItemsResource extends PagedResource<PolicyItem> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'policies/items');
	}

	downloadCsv(params?: any, token?: CancellationToken): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params, token);
	}
}
