import { Job } from './jobs';
import { Connection, Account, PlatformItem } from './connections';

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

export interface PermissionsImportOptions {
	source?: AttributeImportSource;
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
	permissions_import?: PermissionsImportOptions;
}

export interface TransferAuditEntry {
	job_id?: string;
	execution_id?: number;
	source?: Connection;
	destination?: Connection;
	from_source?: boolean;
	to_destination?: boolean;
	bytes?: number;
	event?: string;
	id?: number;
	level?: string;
	recorded_on?: number;
}
