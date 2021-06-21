import { IHttpClient } from '../http';
import { getTypedResponse, PagedResource}  from './resource';
import { EntityTypeAssignment, PolicyTrackingGroup } from '../models';
import { CancellationToken } from '../cancellation-token';

export class PolicyTrackingGroupsResource extends PagedResource<PolicyTrackingGroup> {
	constructor(httpClient: IHttpClient, policyId: string) {
		super(httpClient, 'tracking_group');
		this.resourcePath = `policies/${policyId}/tracking_groups`;
	}

	async clone(id: string, body?: PolicyTrackingGroup, params?: any, token?: CancellationToken): Promise<PolicyTrackingGroup> {
		const group = await this.httpClient.post(`${this.resourcePath}/${id}/clone`, body, params, token);
		return this.getSingle(group);
	}

	async addEntityAssignment(id: string, body: EntityTypeAssignment, params?: any, token?: CancellationToken): Promise<PolicyTrackingGroup> {
		const entityTypeId = body.id;
		const result = await this.httpClient.patch(`${this.resourcePath}/${id}/entity_types/${entityTypeId}`, body, params, token);
		return getTypedResponse<PolicyTrackingGroup>(result);
	}

	async deleteEntityAssignment(id: string, entityTypeId: string, token?: CancellationToken): Promise<boolean> {
		return await this.httpClient.delete(`${this.resourcePath}/${id}/entity_types/${entityTypeId}`, null, token);
	}
}
