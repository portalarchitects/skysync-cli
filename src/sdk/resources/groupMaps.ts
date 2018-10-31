import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { GroupMap } from '../models';

export class GroupMapsResource extends PagedResource<GroupMap> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'group_map');
	}
}
