import { IHttpClient } from '../http';
import { getTypedResponse, PagedResource}  from './resource';
import { EntityTypeAssignment, Policy, PolicyEvaluationResult, PropertySchema } from '../models';
import { CancellationToken } from '../cancellation-token';
import { PolicyTrackingGroupsResource } from './policyTrackingGroups';

export class PoliciesResource extends PagedResource<Policy> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'policy', 'policy', 'policies', 'policies', 'policies');
	}

	trackingGroups(policyId: string): PolicyTrackingGroupsResource {
		return new PolicyTrackingGroupsResource(this.httpClient, policyId);
	}

	async schema(id: string, token?: CancellationToken): Promise<PropertySchema> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/schema`, null, token);
		return getTypedResponse<PropertySchema>(result);
	}

	async import(body: FormData, params?: any, token?: CancellationToken): Promise<Policy[]> {
		const result = await this.httpClient.upload(this.resourcePath, null, body, params, token);
		return getTypedResponse<Policy[]>(result);
	}

	async addEntityAssignment(id: string, entityTypeId: string, body: EntityTypeAssignment, params?: any, token?: CancellationToken): Promise<Policy> {
		const result = await this.httpClient.patch(`${this.resourcePath}/${id}/entity_types/${entityTypeId}`, body, params, token);
		return getTypedResponse<Policy>(result);
	}

	async deleteEntityAssignment(id: string, entityTypeId: string, token?: CancellationToken): Promise<boolean> {
		return await this.httpClient.delete(`${this.resourcePath}/${id}/entity_types/${entityTypeId}`, null, token);
	}

	async test(id: string, body: FormData, params?: any, token?: CancellationToken): Promise<PolicyEvaluationResult> {
		const result = await this.httpClient.upload(`${this.resourcePath}/${id}/test`, null, body, params, token);
		return getTypedResponse<PolicyEvaluationResult>(result);
	}

	async testAll(body: FormData, params?: any, token?: CancellationToken): Promise<PolicyEvaluationResult[]> {
		const result = await this.httpClient.upload(`${this.resourcePath}/test`, null, body, params, token);
		return getTypedResponse<PolicyEvaluationResult[]>(result);
	}
}
