import { TransferItem } from '../models';
import { IHttpClient } from '../http';
import { PagedResource } from './resource';

export class TransferItemsResource extends PagedResource<TransferItem> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', 'item', null, null, 'transfers/items');
	}

	ignoreItem(itemid: number): Promise<void> {
		return this.modifyItem(itemid, {ignore: true});
	}

	retryItem(itemid: number): Promise<void> {
		return this.modifyItem(itemid, {retry: true});
	}

	private async modifyItem(itemid: number, params: any): Promise<void> {
		await this.httpClient.patch(`${this.resourcePath}/${itemid}`, undefined, this.mergeDefaultParams(params));
	}

	downloadCsv(params?: any): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params);
	}
}
