import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { TransferSecurityMapping} from '../models';

export class TransferSecurityMappingsResource extends PagedResource<TransferSecurityMapping> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'transfers');
	}

	async list(id: any, params?: any): Promise<TransferSecurityMapping[]> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/security_map`, params);
		return this.getList(result);
	}
}
