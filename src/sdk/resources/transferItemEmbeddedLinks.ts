import { TransferItemEmbeddedLink } from '../models';
import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class TransferItemEmbeddedLinksResource extends PagedResource<TransferItemEmbeddedLink> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'transfers/links');
	}
    
	downloadCsv(params?: any, token?: CancellationToken): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params, token);
	}
}
