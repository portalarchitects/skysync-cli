import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { TransferItem } from '../models/transfers';

export class TransferFoldersResource extends PagedResource<TransferItem> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'transfers/folders');
	}
}
