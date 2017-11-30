/*
import { IHttpClient } from '../http';

import { EditableResource } from './resource';
import { DiagnosticMetric } from '../models';

export class DiagnosticMetricsResource extends EditableResource<DiagnosticMetric> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'metric');
		this.resourcePath = 'diagnostics/metrics';
	}
}
 */
import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
//import { DiagnosticMetric } from '../models';

export class DiagnosticMetricsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async list(params?: any): Promise<BaseResource[]> {
		const result = await this.httpClient.get('diagnostics/metrics', this.mergeDefaultParams(params));
		return getTypedResponse<BaseResource[]>(result, 'metrics');
	}
}
