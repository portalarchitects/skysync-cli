import { TransferItem } from '../models';
import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class TransferItemsResource extends PagedResource<TransferItem> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'transfers/items');
	}

	ignoreItem(itemid: number, token?: CancellationToken): Promise<void> {
		return this.modifyItem(itemid, {ignore: true}, token);
	}

	retryItem(itemid: number, token?: CancellationToken): Promise<void> {
		return this.modifyItem(itemid, {retry: true}, token);
	}

	ignoreMultiple(itemids?: any, token?: CancellationToken): Promise<void> {
		return this.modifyMultiple(itemids, {ignore: true}, token);
	}

	retryMultiple(itemids?: any, token?: CancellationToken): Promise<void> {
		return this.modifyMultiple(itemids, {retry: true}, token);
	}
	
	private async modifyItem(itemid: number, params: any, token?: CancellationToken): Promise<void> {
		await this.httpClient.patch(`${this.resourcePath}/${itemid}`, undefined, this.mergeDefaultParams(params), token);
	}

	private async modifyMultiple(itemids: any, params: any, token?: CancellationToken): Promise<void> {
		await this.httpClient.patch(this.resourcePath, undefined, this.mergeParams(itemids, params), token);
	}
	
		downloadCsv(params?: any, token?: CancellationToken): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params, token);
	}
}
