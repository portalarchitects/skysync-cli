import { IEntityIdentifier, IAuditedEntity } from './base';
import { PolicyCategory } from './policyCategories';
import { Job } from './jobs';
import { TransferPath, TransferPlatformItem } from './transfers';
import { AuditCategory } from './auditCategories';

export enum PolicyItemRiskLevel {
	None = 'none',
	Low = 'low',
	Medium = 'medium',
	High = 'high',
	Critical = 'critical',
	Extreme = 'extreme'
}

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

export interface PolicyItem extends TransferPlatformItem {
	parent_id?: number;
	audit_category?: AuditCategory;
	retried?: number;
	status?: string;
	processed_on?: number;
	root?: boolean;
	type?: 'container' | 'item';
	group?: PolicyItemTrackingGroup;
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

export interface PolicyItemTrackingGroup extends IEntityIdentifier<string> {
	name?: string;
	risk?: PolicyItemRiskLevel;
}
