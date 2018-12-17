import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { GroupMapException } from '../models/groupMaps';

export class GroupMapExclusionsResource extends PagedResource<GroupMapException> {
	constructor(httpClient: IHttpClient, groupMapId: string, location?: 'source' | 'destination') {
		super(httpClient, 'item', 'item', 'item', 'item', `Group_maps/${groupMapId}/exclusions${location ? `/${location}` : ''}`);
	}
}
