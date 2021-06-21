import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { PolicyAction } from '../models';

export class PolicyActionsResource extends PagedResource<PolicyAction> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'policy_action', 'policy_action', 'policy_actions', 'policy_actions', 'policies/actions');
	}
}
