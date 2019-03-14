import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { PersonalDriveMatchesResource } from './personalDriveMatches';

export class PersonalDriveResource extends PagedResource<Account> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'personal_drive');
	}

	matches(jobId: string): PersonalDriveMatchesResource {
		return new PersonalDriveMatchesResource(this.httpClient, jobId);
	}
}
