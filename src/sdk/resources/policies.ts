import { IHttpClient } from '../http';
import { getTypedResponse, PagedResource}  from './resource';
import { Policy, PolicyEvaluationResult } from '../models';
import { CancellationToken } from '../cancellation-token';

export class PoliciesResource extends PagedResource<Policy> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'policy', 'policy', 'policies', 'policies', 'policies');
	}

	async import(body: FormData, params?: any, token?: CancellationToken): Promise<void> {
		await this.httpClient.upload(this.resourcePath, null, body, params, token);
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
