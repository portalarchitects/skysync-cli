import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Policy } from '../models';
import { PolicyItemTrackingGroupsResource } from './policyItemTrackingGroups';

export class PoliciesResource extends PagedResource<Policy> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'policy', 'policy', 'policies', 'policies', 'policies');
	}

	trackingGroups(policyId: string): PolicyItemTrackingGroupsResource {
		return new PolicyItemTrackingGroupsResource(this.httpClient, policyId);
	}
}
