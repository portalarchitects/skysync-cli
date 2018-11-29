import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AccountMapException } from '../models/accountMaps';

export class AccountMapExceptionsResource extends PagedResource<AccountMapException> {
	constructor(httpClient: IHttpClient, accountMapId: string) {
		super(httpClient, 'item', 'item', 'item', 'item', `account_maps/${accountMapId}/exceptions`);
	}
}
