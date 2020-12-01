import { IEntityIdentifier, IAuditedEntity } from './base';
import { StoragePlatform } from './connections';
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

export enum PolicyStatus {
	None = 'none',
	Inactive = 'inactive',
	NoLocations = 'no-locations',
	HasLocationFailures = 'location-failures',
	NoIssues = 'no-issues'
}

export interface Policy extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	category?: PolicyCategory;
	locations?: PolicyLocations;
	status?: PolicyStatus;
	disabled?: boolean;
}

export interface PolicyLocations {
	count?: number;
	error?: number;
	platforms?: (StoragePlatform & {count?: number})[];
}

export interface PolicyJob extends Job {
	policy?: PolicyJobOptions;
}

export interface PolicyJobOptions {
	source: TransferPath;
	policies?: (Policy & {priority?: number})[];
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
