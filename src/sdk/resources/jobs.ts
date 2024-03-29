import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Job, JobResetType } from '../models';
import { CancellationToken } from '../cancellation-token';

export class JobsResource extends PagedResource<Job> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'job');
	}

	start(id: string, params?: any, token?: CancellationToken): Promise<Job> {
		return this.changeStatus(id, 'start', params, token);
	}

	startMultiple(params?: any, token?: CancellationToken): Promise<any> {
		return this.changeStatusMultiple('start', params, token);
	}

	pause(id: string, params?: any, token?: CancellationToken): Promise<Job> {
		return this.changeStatus(id, 'pause', params, token);
	}

	pauseMultiple(params?: any, token?: CancellationToken): Promise<any> {
		return this.changeStatusMultiple('pause', params, token);
	}

	resume(id: string, params?: any, token?: CancellationToken): Promise<Job> {
		return this.changeStatus(id, 'resume', params, token);
	}

	cancel(id: string, params?: any, token?: CancellationToken): Promise<Job> {
		return this.changeStatus(id, 'cancel', params, token);
	}

	patchMultiple(params: any, changes: Job, token?: CancellationToken): Promise<any> {
		return this.httpClient.patch(this.resourcePath, changes, params, token);
	}

	async clone(id: string, body?: any, params?: any, token?: CancellationToken): Promise<Job> {
		const job = await this.httpClient.post(`${this.resourcePath}/${id}/clone`, body, params, token);
		return this.getSingle(job);
	}

	private async changeStatus(id: string, status: string, params?: any, token?: CancellationToken): Promise<Job> {
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

	async reset(id: string, reset: JobResetType, params?: any, token?: CancellationToken): Promise<Job> {
		const job = await this.httpClient.patch(`${this.resourcePath}/${id}`, undefined, this.mergeParams({reset}, params), token);
		return this.getSingle(job);
	}

	resetMultiple(reset: JobResetType, params?: any, token?: CancellationToken): Promise<Job> {
		return this.httpClient.patch(`${this.resourcePath}`, undefined, this.mergeParams({reset}, params), token);
	}
}
