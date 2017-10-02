import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { Group } from '../models';

export class GroupsResource extends EditableResource<Group> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'group', 'owner');
	}
}
