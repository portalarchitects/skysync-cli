import { IHttpClient } from '../http';
import { PagedResource}  from './resource';
import { PolicyTrackingGroup } from '../models';

export class PolicyTrackingGroupsResource extends PagedResource<PolicyTrackingGroup> {
	constructor(httpClient: IHttpClient, policyId?: string) {
		super(httpClient, 'tracking_group');
		this.usePolicy(policyId);
	}
	
	usePolicy(policyId?): PolicyTrackingGroupsResource {
		this.resourcePath = policyId ? `policies/${policyId}/groups` : 'policies/groups';
		return this;
	}
}
