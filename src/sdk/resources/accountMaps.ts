import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AccountMap } from '../models';

export class AccountMapsResource extends PagedResource<AccountMap> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'account_map');
	}
}
