import { IHttpClient } from '../http';
import { BaseResource } from './resource';
import { PersonalDriveExceptionsResource } from './personalDriveExceptions';

export class PersonalDriveJobsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	exceptions(personalDriveJobId: string): PersonalDriveExceptionsResource {
		return new PersonalDriveExceptionsResource(this.httpClient, personalDriveJobId);
	}
}
