import { IEntityIdentifier } from './base';
import { Connection, Account, PlatformItem } from './connections';

export enum JobScheduleMode {
	Automatic = "auto",
	Manual = "manual"
}

export interface JobSchedule {
	mode?: JobScheduleMode;
}

export interface Job extends IEntityIdentifier<string> {
	name?: string;
	kind?: string;
	schedule?: JobSchedule;
	transfer?: TransferOptions;
	disabled?: boolean;
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
	Synchronize = "sync",
	Publish = "publish",
	Move = "move",
	Migrate = "migrate",
	Copy = "copy",
	Taxonomy = "taxonomy"
}

export interface TransferOptions {
	transfer_type?: TransferType;
	source?: TransferPath;
	destination?: TransferPath;
}
