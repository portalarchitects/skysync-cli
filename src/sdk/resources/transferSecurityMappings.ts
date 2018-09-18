import { IHttpClient } from '../http';
import { getPagedResponse, getTypedResponse, Resource, PagedResult } from './resource';
import { TransferSecurityMapping } from '../models';

export class TransferSecurityMappingsResource extends Resource<TransferSecurityMapping> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', 'item', null, null, 'transfers');
	}

	async page(params?: any): Promise<PagedResult<TransferSecurityMapping>> {
		const result = await this.httpClient.get(`${this.resourcePath}/${params && params.id}/security_map`, this.mergeDefaultParams(params));
		const items = getTypedResponse<TransferSecurityMapping[]>(result, 'item');
		return getPagedResponse<TransferSecurityMapping>(result, items);
	}
}
