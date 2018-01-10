import { IHttpClient } from '../http';
import { PagedResource, getTypedResponse } from './resource';
import { TransferAuditEntry } from '../models';

export class TransferAuditsResource extends PagedResource<TransferAuditEntry> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', 'item', null, null, 'transfers/auditing');
	}

	downloadCsv(params?: any): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params);
	}
}
