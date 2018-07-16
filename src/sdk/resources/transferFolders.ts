import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { TransferItem } from '../models/transfers';

export class TransferFoldersResource extends PagedResource<TransferItem> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item');
	}
	
	async list(params?: any): Promise<TransferItem[]> {
		this.resourcePath = `transfers/${params.id}/folders`;
		delete params.id;
		return super.list(params);
	}
}

// const result = await this.httpClient.get(`transfers/${id}/folders`, this.mergeDefaultParams(params));
