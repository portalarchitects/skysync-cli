import { IHttpClient } from '../http';
import { Resource, getPagedResponse, PagedResult } from './resource';
import { JobScheduler } from '../models';
import { CancellationToken } from '../cancellation-token';

export class JobSchedulersResource extends Resource<JobScheduler> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'job_scheduler', 'job_schedulers', null, null, 'schedulers');
	}

	async page(params?: any, token?: CancellationToken): Promise<PagedResult<JobScheduler>> {
		const result = await this.httpClient.get(this.resourcePath, this.mergeDefaultParams(params), token);
		const items = this.getList(result);
		return getPagedResponse<JobScheduler>(result, items);
	}

	start(id: number, params?: any, token?: CancellationToken): Promise<JobScheduler> {
		return this.changeStatus(id, 'start', params, token);
	}

	startMultiple(params?: any, token?: CancellationToken): Promise<any> {
		return this.changeStatusMultiple('start', params, token);
	}

	pause(id: number, params?: any, token?: CancellationToken): Promise<JobScheduler> {
		return this.changeStatus(id, 'pause', params, token);
	}

	pauseMultiple(params?: any, token?: CancellationToken): Promise<any> {
		return this.changeStatusMultiple('pause', params, token);
	}

	stop(id: number, params?: any, token?: CancellationToken): Promise<JobScheduler> {
		return this.changeStatus(id, 'stop', params, token);
	}

	stopMultiple(params?: any, token?: CancellationToken): Promise<any> {
		return this.changeStatusMultiple('stop', params, token);
	}

	private async changeStatus(id: number, status: string, params?: any, token?: CancellationToken): Promise<JobScheduler> {
		const statusParams = {};
		statusParams[status] = 1;
		params = this.mergeParams(statusParams, params);

		const job = await this.httpClient.patch(`${this.resourcePath}/${id}`, undefined, params, token);
		return this.getSingle(job);
	}

	private async changeStatusMultiple(status: string, params?: any, token?: CancellationToken): Promise<any> {
		const statusParams = {};
		statusParams[status] = 1;
		params = this.mergeParams(statusParams, params);

		const result = await this.httpClient.patch(this.resourcePath, undefined, params, token);
		return result;
	}
}
