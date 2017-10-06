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
	
	async getHistoryList(id: string, params?: any): Promise<JobExecution[]> {
		const idPath = (id && id !== 'all') ? `/${id}` : '';
		const jobExecutions = await this.httpClient.get(`${this.resourcePath}${idPath}/history`, params);
		return getTypedResponse<JobExecution[]>(jobExecutions, 'job_executions');
	}
	
	async getHistory(id: string, modifier: string, params?: any): Promise<JobExecution> {
		const idPath = id ? `/${id}` : '';
		const modifierPath = modifier ? `${modifier}` : '';
		const jobExecution = await this.httpClient.get(`${this.resourcePath}${idPath}/history/${modifierPath}`, params);
		return getTypedResponse<JobExecution>(jobExecution, 'job_execution');
	}	
	
	
	async getHistoryCsv(id: string, modifier: string, params?: any): Promise<string> {
		const idPath = id ? `/${id}` : '';
		const modifierPath = modifier ? `/${modifier}` : '';
		return await this.httpClient.get(`${this.resourcePath}${idPath}/history${modifierPath}.csv`, params, true);
	}
	
	async getHistoryCsvList(id: string, params?: any): Promise<string> {
		const idPath = (id && id !== 'all') ? `/${id}` : '';
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
