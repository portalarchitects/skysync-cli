import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { PolicyActionDescriptor } from '../models';

export class PolicyActionTypesResource extends PagedResource<PolicyActionDescriptor> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'action_type', 'action_type', 'action_types', 'action_types', 'policies/action_types');
	}
}
