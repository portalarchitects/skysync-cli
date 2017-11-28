import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { DiagnosticMetric } from '../models';

export class DiagnosticMetricsResource extends EditableResource<DiagnosticMetric> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'diagnostic_metrics');
		this.resourcePath = 'diagnostics/metrics'
	}
}

