import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AccountMap } from '../models';
import { AccountMapExceptionsResource } from './accountMapExceptions';
import { AccountMapExclusionsResource } from './accountMapExclusions';

export class AccountMapsResource extends PagedResource<AccountMap> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'account_map');
	}
	
	exceptions(accountMapId: string): AccountMapExceptionsResource {
		return new AccountMapExceptionsResource(this.httpClient, accountMapId);
	}
	
	exclusions(accountMapId: string, location?: string): AccountMapExclusionsResource {
		return new AccountMapExclusionsResource(this.httpClient, accountMapId, location);
	}
}
