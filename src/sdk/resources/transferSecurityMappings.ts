import { IHttpClient } from '../http';
import { getPagedResponse, getTypedResponse, PagedResource, PagedResult } from './resource';
import { TransferSecurityMapping} from '../models';

export class TransferSecurityMappingsResource extends PagedResource<TransferSecurityMapping> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', 'item', null, null, 'transfers');
	}

	async page(params?: any): Promise<PagedResult<TransferSecurityMapping>> {
		const result = await this.httpClient.get(`${this.resourcePath}/${params && params.id}/security_map`, this.mergeDefaultParams(params));
		const items = getTypedResponse<TransferSecurityMapping[]>(result, this.singularType);
		return getPagedResponse<TransferSecurityMapping>(result, items);
	}
}
