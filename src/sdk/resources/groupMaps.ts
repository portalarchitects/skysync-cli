import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { GroupMap } from '../models';
import { GroupMapExceptionsResource } from './groupMapExceptions';
import { GroupMapExclusionsResource } from './groupMapExclusions';

export class GroupMapsResource extends PagedResource<GroupMap> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'group_map');
	}

	exceptions(groupMapId: string): GroupMapExceptionsResource {
		return new GroupMapExceptionsResource(this.httpClient, groupMapId);
	}

	exclusions(groupMapId: string): GroupMapExclusionsResource {
		return new GroupMapExclusionsResource(this.httpClient, groupMapId);
	}
}
