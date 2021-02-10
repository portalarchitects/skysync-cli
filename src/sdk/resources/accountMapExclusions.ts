import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AccountMapException } from '../models/accountMaps';
import { CancellationToken } from '../cancellation-token';

export class AccountMapExclusionsResource extends PagedResource<AccountMapException> {
	constructor(httpClient: IHttpClient, accountMapId: string, location?: 'source' | 'destination') {
		super(httpClient, 'item', 'item', 'item', 'item', `account_maps/${accountMapId}/exclusions${location ? `/${location}` : ''}`);
	}

	import(body: FormData, params?: any, token?: CancellationToken): Promise<boolean> {
		return this.httpClient.upload(this.resourcePath, null, body, params, token);
	}
}
