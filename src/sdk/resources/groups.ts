import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { OwnershipGroup } from '../models';

export class OwnershipGroupsResource extends PagedResource<OwnershipGroup> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'group', 'owner');
	}
}
