import { IEntityIdentifier } from './base';

export interface DiagnosticMetric extends IEntityIdentifier<string> {
	name?: string;
}
