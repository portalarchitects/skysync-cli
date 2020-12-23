import { IHttpClient } from '../http';
import { BaseResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class ConfigurationResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(token?: CancellationToken): Promise<{}> {
		return await this.httpClient.get('admin/config', token);
	}

	async patch(body: {}, token?: CancellationToken): Promise<{}> {
		return await this.httpClient.patch('admin/config', body, token);
	}

	async acceptEula(token?: CancellationToken): Promise<{}> {
		return await this.httpClient.patch('admin/config/acceptEula', null, token);
	}
}
