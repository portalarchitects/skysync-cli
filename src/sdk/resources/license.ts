import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { License } from '../models';
import { CancellationToken } from '../cancellation-token';

export class LicenseResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(usage: boolean = false, token?: CancellationToken): Promise<License> {
		const response = await this.httpClient.get('licensing', usage ? {usage} : undefined, token);
		return getTypedResponse<License>(response);
	}

	async refresh(usage: boolean = false, token?: CancellationToken): Promise<License> {
		const response = await this.httpClient.post('licensing/refresh', null, usage ? {usage} : undefined, token);
		return getTypedResponse<License>(response);
	}

	async activate(key: string, usage: boolean = false, token?: CancellationToken): Promise<License> {
		const response = await this.httpClient.post('licensing/activate', {key}, usage ? {usage} : undefined, token);
		return getTypedResponse<License>(response);
	}
}
