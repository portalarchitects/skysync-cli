import { TransferJobStatistics } from '../models';
import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';

export class TransferJobStatisticsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(id: string, params?: any): Promise<TransferJobStatistics> {
		const result = await this.httpClient.get(`transfers/${id}/stats`, this.mergeDefaultParams(params));
		return getTypedResponse<TransferJobStatistics>(result);
	}
}
