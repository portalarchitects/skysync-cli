import { IHttpClient } from '../http';
import {EditableResource, getTypedResponse} from './resource';
import { Job } from '../models';
import {JobExecution} from "../models/jobs";

export class JobsResource extends EditableResource<Job> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'job');
	}

	start(id: string, params?: any): Promise<Job> {
		return this.changeStatus(id, 'start', params);
	}

	pause(id: string, params?: any): Promise<Job> {
		return this.changeStatus(id, 'pause', params);
	}

	cancel(id: string, params?: any): Promise<Job> {
		return this.changeStatus(id, 'cancel', params);
	}
	
	async getHistory(id: string, params?: any): Promise<JobExecution[]> {
		const idPath = id ? `/${id}` : '';
		const jobExecutions = await this.httpClient.get(`${this.resourcePath}${idPath}/history`, params);
		return getTypedResponse<JobExecution[]>(jobExecutions, 'job_executions');
	}
	
	async getHistoryCsv(id: string, params?: any): Promise<string> {
		const idPath = id ? `/${id}` : '';
		return await this.httpClient.get(`${this.resourcePath}${idPath}/history.csv`, params, true);
	}

	private async changeStatus(id: string, status: string, params?: any): Promise<Job> {
		const statusParams = {};
		statusParams[status] = 1;
		params = this.mergeParams(statusParams, params);

		const job = await this.httpClient.patch(`${this.resourcePath}/${id}`, undefined, params);
		return this.getSingle(job);
	}
}
