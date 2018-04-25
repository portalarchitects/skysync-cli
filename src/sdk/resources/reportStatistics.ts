import { TransferJobStatistics } from '../models';
import { IHttpClient } from '../http';
import { TransferReportsResource } from './reports';

export class TransferReportStatisticsResource {
	private resource: TransferReportsResource;

	constructor(httpClient: IHttpClient) {
		this.resource = new TransferReportsResource(httpClient);
	}

	async get(id: string, params?: any): Promise<TransferJobStatistics> {
		const result = await this.resource.stats(id, params);
		if (result) {
			result.id = id;
		}
		return result;
	}
}
