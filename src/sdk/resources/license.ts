import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { License } from '../models';

export class LicenseResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(usage: boolean = false): Promise<License> {
		const response = await this.httpClient.get(`licensing`, usage ? {usage} : undefined);
		return getTypedResponse<License>(response);
	}

	async refresh(usage: boolean = false): Promise<License> {
		const response = await this.httpClient.post(`licensing/refresh`, null, usage ? {usage} : undefined);
		return getTypedResponse<License>(response);
	}

	async activate(key: string, usage: boolean = false): Promise<License> {
		const response = await this.httpClient.post(`licensing/activate`, {key}, usage ? {usage} : undefined);
		return getTypedResponse<License>(response);
	}

	async acceptEula(usage: boolean = false): Promise<License> {
		const response = await this.httpClient.patch(`licensing/acceptEula`, undefined, usage ? {usage} : undefined);
		return getTypedResponse<License>(response);
	}
}
