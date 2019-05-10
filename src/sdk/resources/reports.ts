import { IHttpClient } from '../http';
import { PagedResult, PagedResource, getTypedResponse, getPagedResponse } from './resource';
import {
	TransferReport,
	TransferJobStatistics,
	TransferItem,
	TransferJob
} from '../models';
import { CancellationToken } from '../cancellation-token';

export class TransferReportsResource extends PagedResource<TransferReport> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'report');
	}

	async stats(id: string, params?: any, token?: CancellationToken): Promise<TransferJobStatistics> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/stats`, this.mergeDefaultParams(params), token);
		return getTypedResponse<TransferJobStatistics>(result);
	}

	async items(id: string, params?: any, token?: CancellationToken): Promise<PagedResult<TransferItem>> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/items`, this.mergeDefaultParams(params), token);
		const items = getTypedResponse<TransferItem[]>(result);
		return getPagedResponse<TransferItem>(result, items);
	}

	async jobs(id: string, params?: any, token?: CancellationToken): Promise<PagedResult<TransferJob>> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/jobs`, this.mergeDefaultParams(params), token);
		const items = getTypedResponse<TransferJob[]>(result);
		return getPagedResponse<TransferJob>(result, items);
	}
}
