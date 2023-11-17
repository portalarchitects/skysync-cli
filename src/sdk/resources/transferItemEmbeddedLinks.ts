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
    
	ignoreAllLinksForItem(itemId: number, token?: CancellationToken): Promise<void> {
		return this.modifyAllLinksForMultipleItems([itemId], {ignore: true}, token);
	}

	retryAllLinksForItem(itemId: number, token?: CancellationToken): Promise<void> {
		return this.modifyAllLinksForMultipleItems([itemId], {retry: true}, token);
	}

	ignoreAllLinksForMultipleItems(itemIds: number[], params?: any, token?: CancellationToken): Promise<void> {
		return this.modifyAllLinksForMultipleItems(itemIds, this.mergeParams(params, {ignore: true}), token);
	}

	retryAllLinksForMultipleItems(itemIds: number[], params?: any, token?: CancellationToken): Promise<void> {
		return this.modifyAllLinksForMultipleItems(itemIds, this.mergeParams(params, {retry: true}), token);
	}

	private async modifyAllLinksForMultipleItems(itemIds: number[], params: any, token?: CancellationToken): Promise<void> {
		await this.httpClient.patch(this.resourcePath, undefined, this.mergeParams(params, {items: itemIds}), token);
	}
}
