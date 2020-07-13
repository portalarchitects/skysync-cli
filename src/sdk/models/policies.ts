import { IEntityIdentifier, IAuditedEntity } from './base';
import { PolicyCategory } from './policyCategories';
import { Job } from './jobs';
import { TransferPath } from './transfers';

export interface Policy extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	category?: PolicyCategory;
	disabled?: boolean;
}

export interface PolicyJob extends Job {
	policy?: PolicyJobOptions;
}

export interface PolicyJobOptions extends TransferPath {
	policy?: Policy[];
}
