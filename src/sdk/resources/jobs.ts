import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Job } from '../models';
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

	resetValidate(id: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		return this.reset(id, 'validate', start, params, token);
	}

	resetValidateFiltered(id: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		return this.reset(id, 'validate_filtered', start, params, token);
	}

	resetValidateShared(id: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		return this.reset(id, 'validate_shared', start, params, token);
	}

	resetValidateAll(id: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		return this.reset(id, 'validate_all', start, params, token);
	}

	resetStats(id: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		return this.reset(id, 'stats', start, params, token);
	}

	resetPermissions(id: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		return this.reset(id, 'permissions', start, params, token);
	}

	resetSoft(id: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		return this.reset(id, 'soft', start, params, token);
	}

	resetHard(id: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		return this.reset(id, 'hard', start, params, token);
	}

	resetFull(id: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		return this.reset(id, 'full', start, params, token);
	}

	private async reset(id: string, resetType: string, start: boolean, params?: any, token?: CancellationToken): Promise<Job> {
		const resetParams = {
			reset: resetType
		};
		if (start) {
			resetParams['start'] = 1;
		}
		params = this.mergeParams(resetParams, params);

		const job = await this.httpClient.patch(`${this.resourcePath}/${id}`, undefined, params, token);
		return this.getSingle(job);
	}
}
