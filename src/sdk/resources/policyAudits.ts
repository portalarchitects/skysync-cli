import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { PolicyAuditEntry } from '../models';
import { CancellationToken } from '../cancellation-token';

export class PolicyAuditsResource extends PagedResource<PolicyAuditEntry> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'policies/auditing');
	}

	downloadCsv(params?: any, token?: CancellationToken): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params, token);
	}
}
