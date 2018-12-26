import { IHttpClient } from '../http';
import { BaseResource } from './resource';

export class ConfigurationResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(): Promise<{}> {
		return await this.httpClient.get('admin/config');
	}

	async patch(body: {}): Promise<{}> {
		return await this.httpClient.patch(`admin/config`, body);
	}

	async acceptEula(): Promise<{}> {
		return await this.httpClient.patch(`admin/config/acceptEula`, null);
	}
}
