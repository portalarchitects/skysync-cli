import { IHttpClient } from '../http';
import { PagedResource}  from './resource';
import { PolicyTrackingGroup } from '../models';
import { CancellationToken } from '../cancellation-token';

export class PolicyTrackingGroupsResource extends PagedResource<PolicyTrackingGroup> {
	constructor(httpClient: IHttpClient, policyId: string) {
		super(httpClient, 'tracking_group');
		this.resourcePath = `policies/${policyId}/tracking_groups`;
	}

	async clone(id: string, body?: any, params?: any, token?: CancellationToken): Promise<PolicyTrackingGroup> {
		const group = await this.httpClient.post(`${this.resourcePath}/${id}/clone`, body, params, token);
		return this.getSingle(group);
	}
}
