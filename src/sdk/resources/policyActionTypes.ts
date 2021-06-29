import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { PolicyActionDescriptor } from '../models';

export class PolicyActionTypesResource extends PagedResource<PolicyActionDescriptor> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'policy_action_type', 'policy_action_type', 'policy_action_types', 'policy_action_types', 'policies/action_types');
	}
}
