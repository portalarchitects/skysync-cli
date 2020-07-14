import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Policy } from '../models';

export class PoliciesResource extends PagedResource<Policy> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'policy', 'policy', 'policies', 'policies', 'policies');
	}
}
