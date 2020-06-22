import { IEntityIdentifier, IAuditedEntity } from './base';
import { JobCategory } from './jobCategories';
import { Job } from './jobs';
import { TransferPath } from './transfers';

export interface Policy extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	category?: JobCategory;
	disabled?: boolean;
}

export interface PolicyLocation extends Job {
	policy?: PolicyLocationOptions;
}

export interface PolicyLocationOptions extends TransferPath {
}
