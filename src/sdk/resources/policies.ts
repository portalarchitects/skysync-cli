import { IHttpClient } from '../http';
import { getTypedResponse, PagedResource}  from './resource';
import { Policy, PolicyEvaluationResult } from '../models';
import { CancellationToken } from '../cancellation-token';
import { PolicyTrackingGroupsResource } from './policyTrackingGroups';

export class PoliciesResource extends PagedResource<Policy> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'policy', 'policy', 'policies', 'policies', 'policies');
	}

	trackingGroups(policyId: string): PolicyTrackingGroupsResource {
		return new PolicyTrackingGroupsResource(this.httpClient, policyId);
	}

	async import(body: FormData, params?: any, token?: CancellationToken): Promise<Policy[]> {
		const result = await this.httpClient.upload(this.resourcePath, null, body, params, token);
		return getTypedResponse<Policy[]>(result);
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
