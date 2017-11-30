import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { DiagnosticMetric } from '../models';

export class DiagnosticMetricsResource extends EditableResource<DiagnosticMetric> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'metric');
		this.resourcePath = 'diagnostics/metrics';
	}
}

