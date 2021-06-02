import { IHttpClient } from '../http';
import { PagedResource}  from './resource';
import { PolicyTrackingGroup } from '../models';

export class PolicyTrackingGroupsResource extends PagedResource<PolicyTrackingGroup> {
	constructor(httpClient: IHttpClient, policyId: string) {
		super(httpClient, 'tracking_group');
		this.resourcePath = `policies/${policyId}/tracking_groups`;
	}
}
