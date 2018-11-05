import { IHttpClient } from '../http';
import { PagedResult, PagedResource, getTypedResponse, getPagedResponse } from './resource';
import { GroupMap } from '../models';
import { GroupMapException } from '../models/groupMaps';

export class GroupMapsResource extends PagedResource<GroupMap> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'group_map');
	}

	async exceptions(id: string, params?: any): Promise<PagedResult<GroupMapException>> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/exceptions`, this.mergeDefaultParams(params));
		const exceptions = getTypedResponse<GroupMapException[]>(result);
		return getPagedResponse<GroupMapException>(result, exceptions);
	}

	async exclusions(id: string, params?: any): Promise<PagedResult<GroupMapException>> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/exclusions`, this.mergeDefaultParams(params));
		const exclusions = getTypedResponse<GroupMapException[]>(result);
		return getPagedResponse<GroupMapException>(result, exclusions);
	}
}
