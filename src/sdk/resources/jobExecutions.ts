import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { JobExecution } from '../models';

export class JobExecutionsResource extends PagedResource<JobExecution> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'job_execution', null, null, null, 'jobs/history');
	}

	downloadCsv(params?: any): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params);
	}
}
