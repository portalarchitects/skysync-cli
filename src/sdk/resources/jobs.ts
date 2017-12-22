import { IHttpClient } from '../http';
import { PagedResource, getTypedResponse } from './resource';
import { Job, JobExecution, TransferAuditEntry } from '../models';

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
		return await this.httpClient.get(`${this.resourcePath}${idPath}/history${modifierPath}.csv`, params);
	}

	async getHistoryCsvList(id: string, params?: any): Promise<string> {
		const idPath = (id && id !== 'all') ? `/${id}` : '';
		return await this.httpClient.get(`${this.resourcePath}${idPath}/history.csv`, params);
	}

	async getAuditList(id: string, params?: any): Promise<TransferAuditEntry[]> {
		const idPath = id ? `${this.resourcePath}/${id}/` : '';
		const entries = await this.httpClient.get(`${idPath}auditing`, params);
		return getTypedResponse<TransferAuditEntry[]>(entries, 'item');
	}

	async getAudit(id: string, execution: string, params?: any): Promise<TransferAuditEntry> {
		const idPath = id ? `/${id}` : '';
		const executionPath = execution ? `/executions/${execution}` : '';
		const entry = await this.httpClient.get(`${this.resourcePath}${idPath}${executionPath}/auditing`, params);
		return getTypedResponse<TransferAuditEntry>(entry, 'item');
	}

	async getAuditCsv(id: string, execution: string, params?: any): Promise<string> {
		const idPath = id ? `/${id}` : '';
		const executionPath = execution ? `/executions/${execution}` : '';
		return await this.httpClient.get(`${this.resourcePath}${idPath}${executionPath}/auditing.csv`, params);
	}

	async getAuditCsvList(id: string, params?: any): Promise<string> {
		const idPath = id ? `${this.resourcePath}/${id}/` : '';
		return await this.httpClient.get(`${idPath}auditing.csv`, params);
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
