import { Job, ItemInspectionPolicy } from './jobs';
import { Connection, Account, PlatformItem, SecurityIdentifier } from './connections';
import { IEntityIdentifier } from './base';
import { AuditCategory } from './auditCategories';

export interface TransferJob extends Job {
	transfer?: TransferOptions;
}

export interface AttributeImportTextSource {
	target?: TransferTarget;
}

export interface AttributeImportSource {
	text?: AttributeImportTextSource;
	delimiter?: string;
}

export interface MetadataImportOptions {
	schema?: string;
	source?: AttributeImportSource;
}

export interface PermissionsOptions {
	import?: PermissionsImportOptions;
	policy?: PermissionsPreservationPolicy;
	failures?: PermissionsFailurePolicy;
}

export interface PermissionsImportOptions {
	source?: AttributeImportSource;
}

export enum PermissionsPreservationPolicy {
	None = 'none',
	AddOnly = 'add',
	ReconcileDifferences = 'diff'
}

export enum PermissionsFailurePolicy {
	FailOnExceptions = 'exceptions',
	FailOnDeny = 'deny',
	Fail = 'all',
	None = 'none'
}

export interface TransferTarget {
	item?: PlatformItem;
	path?: string;
}

export interface TransferPath {
	connection?: Connection;
	impersonate_as?: Account;
	target?: TransferTarget;
}

export enum TransferType {
	Synchronize = 'sync',
	Publish = 'publish',
	Move = 'move',
	Migrate = 'migrate',
	Copy = 'copy',
	Taxonomy = 'taxonomy'
}

export interface TransferOptions {
	transfer_type?: TransferType;
	source?: TransferPath;
	destination?: TransferPath;
	conflict_resolution?: string;
	delete_propagation?: string;
	metadata_import?: MetadataImportOptions;
	permissions?: PermissionsOptions;
	item_inspection_policy?: ItemInspectionPolicy;
	item_inspection_policy_next?: ItemInspectionPolicy;
}

export interface TransferItem extends IEntityIdentifier<number> {
	parent_id?: number;
	source?: TransferPlatformItem;
	destination?: TransferPlatformItem;
	audit_category?: AuditCategory;
	retried?: number;
	status?: string;
	processing?: string[];
	source_to_destination?: boolean;
	transferred_on?: number;
	root?: boolean;
	type?: 'container' | 'item';
}

export interface TransferPlatformItem extends IEntityIdentifier<string> {
	name?: string;
	caption?: string;
	path?: string;
	ext?: string;
	mime_type?: string;
	file_type?: string;
	bytes?: number;
	version?: string;
	hash?: string;
	etag?: string;
	created_on?: number;
	modified_on?: number;
}

export interface TransferAuditEntry extends IEntityIdentifier<number> {
	job_id?: string;
	execution_id?: number;
	target?: TransferItem;
	from_source?: boolean;
	to_source?: boolean;
	from_destination?: boolean;
	to_destination?: boolean;
	bytes?: number;
	version?: string;
	hash?: string;
	level?: string;
	type?: string;
	message?: string;
	recorded_on?: number;
}

export interface TransferSecurityMapping extends IEntityIdentifier<string> {
	source?: SecurityIdentifier;
	destination?: SecurityIdentifier;
	resolution?: string;
	message?: string;
}

export enum AccessRights {
	None = 'none',
	Read = 'read',
	Write = 'write',
	Append = 'append',
	Delete = 'delete',
	ReadPermissions = 'read_permissions',
	WritePermissions = 'write_permissions',
	ReadWrite = 'read_write',
	FullPermissions = 'full_permissions',
	FullControl = 'full'
}

export enum AccessControlType {
	Allow = 'allow',
	Deny = 'deny'
}

export interface TransferPermission extends IEntityIdentifier<number> {
	security_map?: TransferSecurityMapping;
	target?: TransferItem;
	rights?: AccessRights;
	access?: AccessControlType;
	audit_trail: string;
}
