import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class PersonalDriveMatchesResource extends PagedResource<Account> {
	constructor(httpClient: IHttpClient, jobId: string) {
		super(httpClient, 'item', 'item', 'item', 'item', `transfers/${jobId}/personal_drives/matches`);
	}

	import(body: FormData, params?: any, token?: CancellationToken): Promise<boolean> {
		return this.httpClient.upload(this.resourcePath, body, params, token);
	}
}
