import { TransferJobStatistics } from '../models';
import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class TransferJobStatisticsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(id: string, params?: any, token?: CancellationToken): Promise<TransferJobStatistics> {
		const result = await this.httpClient.get(`transfers/${id}/stats`, this.mergeDefaultParams(params), token);
		return getTypedResponse<TransferJobStatistics>(result);
	}

	async summarize(params?: any, token?: CancellationToken): Promise<TransferJobStatistics> {
		const result = await this.httpClient.get('transfers/stats', this.mergeDefaultParams(params), token);
		return getTypedResponse<TransferJobStatistics>(result);
	}
}
