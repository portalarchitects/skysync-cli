import { IHttpClient } from '../http';
import { PagedResource } from './resource';

export class PersonalDriveMatchesResource extends PagedResource<Account> {
	constructor(httpClient: IHttpClient, jobId: string) {
		super(httpClient, 'item', 'item', 'item', 'item', `transfers/${jobId}/personal_drives/matches`);
	}
}
