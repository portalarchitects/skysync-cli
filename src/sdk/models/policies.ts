import { IEntityIdentifier, IAuditedEntity } from './base';
import { JobCategory } from './jobCategories';
import { Job } from './jobs';
import { TransferPath, TransferPlatformItem } from './transfers';
import { AuditCategory } from './auditCategories';

export interface Policy extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	category?: JobCategory;
	disabled?: boolean;
}

export interface PolicyJob extends Job {
	policy?: PolicyJobOptions;
}

export interface PolicyJobOptions {
	source?: TransferPath;
}

export interface PolicyItem extends IEntityIdentifier<number> {
	parent_id?: number;
	source?: TransferPlatformItem;
	audit_category?: AuditCategory;
	retried?: number;
	status?: string;
	processing?: string[];
	source_to_destination?: boolean;
	transferred_on?: number;
	root?: boolean;
	type?: 'container' | 'item';
}

export interface PolicyAuditEntry extends IEntityIdentifier<number> {
	job_id?: string;
	execution_id?: number;
	target?: PolicyItem;
	bytes?: number;
	version?: string;
	hash?: string;
	level?: string;
	type?: string;
	message?: string;
	recorded_on?: number;
}
