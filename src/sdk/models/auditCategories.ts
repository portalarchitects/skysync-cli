import { IEntityIdentifier } from './base';

export interface AuditCategory extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
	level?: string;
	help_url?: string;
}
