import { IEntityIdentifier } from './base';

export interface DiagnosticMetric extends IEntityIdentifier<string> {
	metrics: any;
}
