import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { ConventionAuditEntry } from '../models';

export class ConventionAuditsResource extends PagedResource<ConventionAuditEntry> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'conventions/auditing');
	}

	downloadCsv(params?: any): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params);
	}
}
