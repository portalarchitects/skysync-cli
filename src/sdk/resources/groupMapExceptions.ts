import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { GroupMapException } from '../models/groupMaps';
import { CancellationToken } from '../cancellation-token';

export class GroupMapExceptionsResource extends PagedResource<GroupMapException> {
	constructor(httpClient: IHttpClient, groupMapId: string) {
		super(httpClient, 'item', 'item', 'item', 'item', `Group_maps/${groupMapId}/exceptions`);
	}

	import(body: FormData, params?: any, token?: CancellationToken): Promise<boolean> {
		return this.httpClient.upload(this.resourcePath, body, params, token);
	}
}
