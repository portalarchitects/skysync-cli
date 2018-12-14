import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AccountMapException } from '../models/accountMaps';

export class AccountMapExclusionsResource extends PagedResource<AccountMapException> {
	constructor(httpClient: IHttpClient, accountMapId: string, location?: string) {
		super(httpClient, 'item', 'item', 'item', 'item', `account_maps/${accountMapId}/exclusions${location ? `/${location}` : ''}`);
	}
}
