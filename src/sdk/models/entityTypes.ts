import { IAuditedEntity, IEntityIdentifier } from './base';

export interface EntityType extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	kind?: string;
	threshold?: number;
	disabled?: boolean;
}
