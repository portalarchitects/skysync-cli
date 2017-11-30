import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';

export class DiagnosticMetricsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async list(params?: any): Promise<BaseResource[]> {
		const result = await this.httpClient.get('diagnostics/metrics', this.mergeDefaultParams(params));
		return getTypedResponse<BaseResource[]>(result, 'metrics');
	}
}
