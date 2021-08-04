import { PoliciesStatisticsSummary } from '../models';
import { IHttpClient } from '../http';
import { getTypedResponse, PagedResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class PolicyStatisticsSummaryResource extends PagedResource<PoliciesStatisticsSummary> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'statistics_summary', null, null, 'policies/stats/summary');
	}

	async get(params?: any, token?: CancellationToken): Promise<PoliciesStatisticsSummary> {
		const result = await this.httpClient.get(this.resourcePath, this.mergeDefaultParams(params), token);
		return getTypedResponse<PoliciesStatisticsSummary>(result);
	}
}
