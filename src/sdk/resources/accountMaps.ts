import { IHttpClient } from '../http';
import { PagedResult, PagedResource, getTypedResponse, getPagedResponse } from './resource';
import { AccountMap } from '../models';
import { AccountMapException, AccountMapExclusion } from '../models/accountMaps';

export class AccountMapsResource extends PagedResource<AccountMap> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'account_map');
	}

	async exceptions(id: string, params?: any): Promise<PagedResult<AccountMapException>> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/exceptions`, this.mergeDefaultParams(params));
		const exceptions = getTypedResponse<AccountMapException[]>(result);
		return getPagedResponse<AccountMapException>(result, exceptions);
	}

	async exclusions(id: string, params?: any): Promise<PagedResult<AccountMapExclusion>> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/exclusions`, this.mergeDefaultParams(params));
		const exclusions = getTypedResponse<AccountMapExclusion[]>(result);
		return getPagedResponse<AccountMapExclusion>(result, exclusions);
	}
}
