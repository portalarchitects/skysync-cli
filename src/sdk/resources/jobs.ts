import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { Job } from '../models';

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

	private async changeStatus(id: string, status: string, params?: any): Promise<Job> {
		const statusParams = {};
		statusParams[status] = 1;
		params = this.mergeParams(statusParams, params);

		const job = await this.httpClient.patch(`${this.resourcePath}/${id}`, undefined, params);
		return job && job[this.singularName];

	}
}
