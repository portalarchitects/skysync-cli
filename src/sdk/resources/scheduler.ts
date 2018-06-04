import { IHttpClient } from '../http';
import { Resource, getPagedResponse, PagedResult } from './resource';
import { JobScheduler } from '../models';

export class JobSchedulersResource extends Resource<JobScheduler> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'job_scheduler', 'job_schedulers', null, null, 'schedulers');
	}

	async page(params?: any): Promise<PagedResult<JobScheduler>> {
		const result = await this.httpClient.get(this.resourcePath, this.mergeDefaultParams(params));
		const items = this.getList(result);
		return getPagedResponse<JobScheduler>(result, items);
	}

	start(id: number, params?: any): Promise<JobScheduler> {
		return this.changeStatus(id, 'start', params);
	}

	startMultiple(params?: any): Promise<any> {
		return this.changeStatusMultiple('start', params);
	}

	pause(id: number, params?: any): Promise<JobScheduler> {
		return this.changeStatus(id, 'pause', params);
	}

	pauseMultiple(params?: any): Promise<any> {
		return this.changeStatusMultiple('pause', params);
	}

	stop(id: number, params?: any): Promise<JobScheduler> {
		return this.changeStatus(id, 'stop', params);
	}

	stopMultiple(params?: any): Promise<any> {
		return this.changeStatusMultiple('stop', params);
	}

	private async changeStatus(id: number, status: string, params?: any): Promise<JobScheduler> {
		const statusParams = {};
		statusParams[status] = 1;
		params = this.mergeParams(statusParams, params);

		const job = await this.httpClient.patch(`${this.resourcePath}/${id}`, undefined, params);
		return this.getSingle(job);
	}

	private async changeStatusMultiple(status: string, params?: any): Promise<any> {
		const statusParams = {};
		statusParams[status] = 1;
		params = this.mergeParams(statusParams, params);

		const result = await this.httpClient.patch(`${this.resourcePath}`, undefined, params);
		return result;
	}
}
