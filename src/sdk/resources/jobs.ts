import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Job } from '../models';

export class JobsResource extends PagedResource<Job> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'job');
	}

	start(id: string, params?: any): Promise<Job> {
		return this.changeStatus(id, 'start', params);
	}

	startMultiple(params?: any): Promise<any> {
		return this.changeStatusMultiple('start', params);
	}

	pause(id: string, params?: any): Promise<Job> {
		return this.changeStatus(id, 'pause', params);
	}

	pauseMultiple(params?: any): Promise<any> {
		return this.changeStatusMultiple('pause', params);
	}

	cancel(id: string, params?: any): Promise<Job> {
		return this.changeStatus(id, 'cancel', params);
	}

	patchMultiple(params: any, changes: Job): Promise<any> {
		return this.httpClient.patch(`${this.resourcePath}`, changes, params);
	}

	async clone(id: string, body?: any, params?: any): Promise<Job> {
		const job = await this.httpClient.post(`${this.resourcePath}/${id}/clone`, body, params);
		return this.getSingle(job);
	}

	private async changeStatus(id: string, status: string, params?: any): Promise<Job> {
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
