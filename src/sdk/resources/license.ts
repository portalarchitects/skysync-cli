import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { License } from '../models';

export class LicenseResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(): Promise<License> {
		const response = await this.httpClient.get(`licensing`);
		return getTypedResponse<License>(response);
	}

	async refresh(): Promise<License> {
		const response = await this.httpClient.post(`licensing/refresh`, null);
		return getTypedResponse<License>(response);
	}

	async activate(key: string): Promise<License> {
		const response = await this.httpClient.post(`licensing/activate`, {key});
		return getTypedResponse<License>(response);
	}
}
