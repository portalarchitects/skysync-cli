import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { TransferSecurityMapping } from '../models';

export class TransferSecurityMappingsResource extends PagedResource<TransferSecurityMapping> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', 'item', 'item', 'item', 'transfers/security_map');
	}
}
