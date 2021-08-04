import { PoliciesStatisticsSummary } from '../models';
import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class PolicyStatisticsSummaryResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(params?: any, token?: CancellationToken): Promise<PoliciesStatisticsSummary> {
		const result = await this.httpClient.get("policies/stats/summary", this.mergeDefaultParams(params), token);
		return getTypedResponse<PoliciesStatisticsSummary>(result);
	}
}
