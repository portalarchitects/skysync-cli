import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AccountMapException } from '../models/accountMaps';
import { CancellationToken } from '../cancellation-token';

export class AccountMapExceptionsResource extends PagedResource<AccountMapException> {
	constructor(httpClient: IHttpClient, accountMapId: string) {
		super(httpClient, 'item', 'item', 'item', 'item', `account_maps/${accountMapId}/exceptions`);
	}

	import(body: FormData, params?: any, token?: CancellationToken): Promise<boolean> {
		return this.httpClient.upload(this.resourcePath, body, params, token);
	}
}
