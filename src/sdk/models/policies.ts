import { IEntityIdentifier, IAuditedEntity, IPrioritizedEntity } from './base';
import { StoragePlatform } from './connections';
import { Category } from './categories';
import { Job } from './jobs';
import { TransferPath, TransferPlatformItem } from './transfers';
import { AuditCategory } from './auditCategories';
import { EntityType } from './entityTypes';
import { MetadataCalculatedFilter } from './metadataFilters';

export enum ContentRiskLevel {
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
	category?: Category;
	locations?: PolicyLocations;
	status?: PolicyStatus;
	disabled?: boolean;
	entity_types?: (EntityType & IPrioritizedEntity)[];
	groups?: PolicyTrackingGroup[];
}

export interface PolicyLocations {
	count?: number;
	error?: number;
	platforms?: (StoragePlatform & { count?: number })[];
}

export interface PolicyJob extends Job {
	policy?: PolicyJobOptions;
}

export interface PolicyJobOptions {
	source: TransferPath;
	policies?: (Policy & IPrioritizedEntity)[];
}

export interface PolicyItem extends TransferPlatformItem {
	parent_id?: number;
	audit_category?: AuditCategory;
	retried?: number;
	status?: string;
	processed_on?: number;
	root?: boolean;
	type?: 'container' | 'item';
	group?: PolicyTrackingGroup;
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

export interface PolicyTrackingGroupRule extends IEntityIdentifier<string> {
	justification?: string;
	criteria?: MetadataCalculatedFilter;
}

export interface PolicyTrackingGroupActionConfiguration {
	id?: string;
	name?: string;
	description?: string;
}

export interface PolicyTrackingGroupAction extends IEntityIdentifier<string> {
	id?: string;
	priority?: number;
	action?: PolicyTrackingGroupActionConfiguration;
}

export interface PolicyTrackingGroup extends IEntityIdentifier<string>, IPrioritizedEntity {
	name?: string;
	description?: string;
	risk?: ContentRiskLevel;
	assignment_rules?: PolicyTrackingGroupRule[];
	entity_types?: (EntityType & IPrioritizedEntity)[];
	actions?: PolicyTrackingGroupAction[];
}
