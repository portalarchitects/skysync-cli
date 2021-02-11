import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AccountMapException } from '../models/accountMaps';
import { CancellationToken } from '../cancellation-token';

export class PersonalDriveExceptionsResource extends PagedResource<AccountMapException> {
	constructor(httpClient: IHttpClient, personalDriveJobId: string) {
		super(httpClient, 'item', 'item', 'item', 'item', `transfers/${personalDriveJobId}/personal_drives/exceptions`);
	}

	import(body: FormData, params?: any, token?: CancellationToken): Promise<boolean> {
		return this.httpClient.upload(this.resourcePath, null, body, params, token);
	}
}
