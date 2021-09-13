import { IEntityIdentifier, IAuditedEntity, IPrioritizedEntity } from './base';
import { StoragePlatform } from './connections';
import { Category } from './categories';
import { Job } from './jobs';
import { TransferPath, TransferPlatformItem } from './transfers';
import { AuditCategory } from './auditCategories';
import { EntityType } from './entityTypes';
import { MetadataCalculatedFilter } from './metadataFilters';
import {PolicyAssignmentStatus} from './policyStatistics';

export enum ContentRiskLevel {
	None = 'none',
	Low = 'low',
	Medium = 'medium',
	High = 'high',
	Critical = 'critical'
}

export enum PolicyStatus {
	None = 'none',
	Inactive = 'inactive',
	NoLocations = 'no-locations',
	HasLocationFailures = 'location-failures',
	NoIssues = 'no-issues'
}

export enum PolicyActionTypeID {
	Approval = 'approval',
	Delay = 'delay',
	Delete = 'delete',
	Move = 'move',
	Remediate = 'remediate'
}

export interface Policy extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	category?: Category;
	locations?: PolicyLocations;
	status?: PolicyStatus;
	readonly?: boolean;
	disabled?: boolean;
	entity_types?: (EntityType & IPrioritizedEntity)[];
	groups?: PolicyTrackingGroup[];
}

export interface PolicyLocations {
	count?: number;
	error?: number;
	executions?: number;
	platforms?: (StoragePlatform & { count?: number })[];
	action_needed_item_count?: number;
}

export interface PolicyJob extends Job {
	policy?: PolicyJobOptions;
}

export interface PolicyJobOptions {
	source: TransferPath;
	policies?: (Policy & IPrioritizedEntity)[];
}

export interface PolicyItem extends TransferPlatformItem {
	tracking_id?: number;
	parent_id?: number;
	audit_category?: AuditCategory;
	retried?: number;
	status?: string;
	processed_on?: number;
	root?: boolean;
	type?: 'container' | 'item';
	group?: PolicyTrackingGroup;
	assignment_status?: PolicyAssignmentStatus;
	identified_by?: PolicyTrackingGroupRule;
	job?: PolicyJobOptions;
	[action: string]: any;
	match_confidence?: number;
}

export interface PolicyItemMatchConfidence {
	entity_type?: EntityType;
	match_confidence?: number;
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

export interface PolicyTrackingGroupRule extends IEntityIdentifier<string>, IPrioritizedEntity {
	justification?: string;
	criteria?: MetadataCalculatedFilter;
}

interface PolicyActionBase extends IEntityIdentifier<PolicyActionTypeID | string> {
	name?: string;
	description?: string;
}

export interface PolicyActionDescriptor extends PolicyActionBase {
	destructive?: boolean;
	exclusive?: boolean;
	requires_existing?: boolean;
	removes_item?: boolean;
	prompt?: any;
}

export interface PolicyTrackingGroupActionConfiguration extends PolicyActionBase {
	[name: string]: any;
}

export interface PolicyTrackingGroupAction extends IEntityIdentifier<string>, IPrioritizedEntity {
	action?: PolicyTrackingGroupActionConfiguration;
}

export interface PolicyTrackingGroup extends IEntityIdentifier<string>, IPrioritizedEntity {
	name?: string;
	description?: string;
	risk?: ContentRiskLevel;
	assignment_rules?: PolicyTrackingGroupRule[];
	entity_types?: (EntityType & IPrioritizedEntity)[];
	actions?: PolicyTrackingGroupAction[];
	cost?: number;
}

export enum PolicyApprovalStatus {
	Pending = 'pending',
	Approved = 'approved',
	Rejected = 'rejected'
}

export interface PolicyApprovalAction {
	status: PolicyApprovalStatus;
}
