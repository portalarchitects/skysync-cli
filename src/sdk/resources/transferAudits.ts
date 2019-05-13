import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { TransferAuditEntry } from '../models';
import { CancellationToken } from '../cancellation-token';

export class TransferAuditsResource extends PagedResource<TransferAuditEntry> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'transfers/auditing');
	}

	downloadCsv(params?: any, token?: CancellationToken): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params, token);
	}
}
