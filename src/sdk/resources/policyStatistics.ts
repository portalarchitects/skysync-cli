import { PolicyStatistics } from '../models';
import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class PolicyStatisticsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(id: string, params?: any, token?: CancellationToken): Promise<PolicyStatistics> {
		const result = await this.httpClient.get(`policies/${id}/stats`, this.mergeDefaultParams(params), token);
		return getTypedResponse<PolicyStatistics>(result);
	}
}
