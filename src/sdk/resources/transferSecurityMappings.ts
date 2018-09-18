import { IHttpClient } from '../http';
import { BaseResource, getPagedResponse, getTypedResponse, PagedResult } from './resource';
import { TransferSecurityMapping } from '../models';

export class TransferSecurityMappingsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async page(params?: any): Promise<PagedResult<TransferSecurityMapping>> {
		const result = await this.httpClient.get(`transfers/${params && params.id}/security_map`, this.mergeDefaultParams(params));
		const items = getTypedResponse<TransferSecurityMapping[]>(result, 'item');
		return getPagedResponse<TransferSecurityMapping>(result, items);
	}
}
