import { IHttpClient } from '../http';
import { PagedResource}  from './resource';
import { PolicyTrackingGroup } from '../models';

export class PoliciesResource extends PagedResource<PolicyTrackingGroup> {
	constructor(httpClient: IHttpClient, policyId?: number) {
		super(httpClient, 'tracking_group');
		this.resourcePath = policyId ? `policies/${policyId}/groups` : 'policies/groups';
	}
}
