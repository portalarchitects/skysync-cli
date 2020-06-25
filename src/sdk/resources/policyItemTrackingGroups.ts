import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { PolicyItemTrackingGroup } from '../models/policies';

export class PolicyItemTrackingGroupsResource extends PagedResource<PolicyItemTrackingGroup> {
	constructor(httpClient: IHttpClient, policyId: string) {
		super(httpClient, 'trackingGroup', 'tracking_group', 'tracking_groups', 'tracking_groups', `policies/${policyId}/tracking_groups`);
	}
}
