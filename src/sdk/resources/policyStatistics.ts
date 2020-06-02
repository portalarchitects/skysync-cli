import { PolicyJobStatistics } from '../models';
import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class PolicyJobStatisticsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(id: string, params?: any, token?: CancellationToken): Promise<PolicyJobStatistics> {
		const result = await this.httpClient.get(`policies/${id}/stats`, this.mergeDefaultParams(params), token);
		return getTypedResponse<PolicyJobStatistics>(result);
	}

	async summarize(params?: any, token?: CancellationToken): Promise<PolicyJobStatistics> {
		const result = await this.httpClient.get(`policies/stats`, this.mergeDefaultParams(params), token);
		return getTypedResponse<PolicyJobStatistics>(result);
	}
}
