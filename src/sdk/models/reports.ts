import { IEntityIdentifier, IAuditedEntity } from './base';

export interface TransferReport extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	parameters?: any;
}
