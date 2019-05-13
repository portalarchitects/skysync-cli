import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { DiagnosticMetric } from '../models';
import { CancellationToken } from '../cancellation-token';

export class DiagnosticMetricsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async list(params?: any, token?: CancellationToken): Promise<DiagnosticMetric[]> {
		const result = await this.httpClient.get('diagnostics/metrics', this.mergeDefaultParams(params), token);
		return getTypedResponse<DiagnosticMetric[]>(result, 'metrics');
	}
}
