import { IEntityIdentifier, IAuditedEntity } from './base';
import { PolicyCategory } from './policyCategories';
import { Job } from './jobs';
import {TransferItem, TransferPath} from './transfers';

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
	policies?: Policy[];
}

export interface PolicyAuditEntry extends IEntityIdentifier<number> {
	job_id?: string;
	execution_id?: number;
	target?: TransferItem;
	bytes?: number;
	version?: string;
	hash?: string;
	level?: string;
	type?: string;
	message?: string;
	recorded_on?: number;
}
