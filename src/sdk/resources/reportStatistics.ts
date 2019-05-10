import { TransferJobStatistics } from '../models';
import { IHttpClient } from '../http';
import { TransferReportsResource } from './reports';
import { CancellationToken } from '../cancellation-token';

export class TransferReportStatisticsResource {
	private resource: TransferReportsResource;

	constructor(httpClient: IHttpClient) {
		this.resource = new TransferReportsResource(httpClient);
	}

	async get(id: string, params?: any, token?: CancellationToken): Promise<TransferJobStatistics> {
		const result = await this.resource.stats(id, params, token);
		if (result) {
			result.id = id;
		}
		return result;
	}
}
