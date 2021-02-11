import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { GroupMapException } from '../models/groupMaps';
import { CancellationToken } from '../cancellation-token';

export class GroupMapExclusionsResource extends PagedResource<GroupMapException> {
	constructor(httpClient: IHttpClient, groupMapId: string, location?: 'source' | 'destination') {
		super(httpClient, 'item', 'item', 'item', 'item', `Group_maps/${groupMapId}/exclusions${location ? `/${location}` : ''}`);
	}

	import(body: FormData, params?: any, token?: CancellationToken): Promise<boolean> {
		return this.httpClient.upload(this.resourcePath, null, body, params, token);
	}
}
