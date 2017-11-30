import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { DiagnosticMetric } from '../models';

export class DiagnosticMetricsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async list(params?: any): Promise<DiagnosticMetric[]> {
		const result = await this.httpClient.get('diagnostics/metrics', this.mergeDefaultParams(params));
		return getTypedResponse<DiagnosticMetric[]>(result, 'metrics');
	}
}
