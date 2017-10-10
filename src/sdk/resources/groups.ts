import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { OwnershipGroup } from '../models';

export class OwnershipGroupsResource extends EditableResource<OwnershipGroup> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'group', 'owner');
	}
}
