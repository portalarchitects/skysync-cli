import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { TransferPermission } from '../models';

export class TransferPermissionsResource extends PagedResource<TransferPermission> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'transfers/permissions');
	}
}
