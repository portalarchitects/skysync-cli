import { IHttpClient } from '../http';
import { Resource } from './resource';
import { PolicyActionDescriptor } from '../models';

export class PolicyActionTypesResource extends Resource<PolicyActionDescriptor> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'policy_action_type', 'policy_action_type', 'policy_action_types', 'policy_action_types', 'policies/action_types');
	}
}
