import { IHttpClient } from '../http';
import { BaseResource } from './resource';
import { CancellationToken } from '../cancellation-token';
import { Performance } from '../models';

export class PerformanceResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(token?: CancellationToken): Promise<Performance> {
		return await this.httpClient.get('performance/configuration', token);
	}
    
	async post(performance: Performance, token?: CancellationToken): Promise<Performance> {
		return await this.httpClient.post('performance/configuration', performance, token);
	}
}
