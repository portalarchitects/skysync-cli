import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AccountMapException } from '../models/accountMaps';

export class PersonalDriveExceptionsResource extends PagedResource<AccountMapException> {
	constructor(httpClient: IHttpClient, personalDriveJobId: string) {
		super(httpClient, 'item', 'item', 'item', 'item', `transfers/${personalDriveJobId}/personal_drives/exceptions`);
	}
}
