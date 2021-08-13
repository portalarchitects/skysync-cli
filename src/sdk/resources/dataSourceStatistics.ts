import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { CancellationToken } from '../cancellation-token';
import { DataSourceIndividualStatistics } from '../models';

export class DataSourceStatisticsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(id: string, params?: any, token?: CancellationToken): Promise<DataSourceIndividualStatistics> {
		const result = await this.httpClient.get(`datasources/${id}/stats`, this.mergeDefaultParams(params), token);
		return getTypedResponse<DataSourceIndividualStatistics>(result);
	}
}
