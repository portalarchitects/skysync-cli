import { IEntityIdentifier } from './base';

export interface AuditCategory extends IEntityIdentifier<string> {
	name?: string;
}
