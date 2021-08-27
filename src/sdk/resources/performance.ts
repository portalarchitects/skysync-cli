import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { CancellationToken } from '../cancellation-token';
import { Performance } from '../models';

export class PerformanceResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(token?: CancellationToken): Promise<Performance> {
		const result = await this.httpClient.get('performance/configuration', token);
		return getTypedResponse<Performance>(result, 'item');
	}
    
	async post(performance: Performance, token?: CancellationToken): Promise<Performance> {
		const result =  await this.httpClient.post('performance/configuration', performance, token);
		return getTypedResponse<Performance>(result, 'item');
	}
}
