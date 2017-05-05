import { IEntityIdentifier } from './base';
import { Connection, Account } from './connections';

export interface JobSchedule {
	mode?: 'auto' | 'manual';
};

export interface Job extends IEntityIdentifier<string> {
	name?: string;
	kind?: string;
	schedule?: JobSchedule;
	transfer?: TransferOptions;
	disabled?: boolean;
};

export interface TransferItem {
	id?: string;
	name?: string;
	caption?: string;
	parent?: TransferItem;
};

export interface TransferTarget {
	item?: TransferItem;
	path?: string;
};

export interface TransferPath {
	connection?: Connection;
	impersonate_as?: Account;
	target?: TransferTarget;
};

export interface TransferOptions {
	source?: TransferPath;
	destination?: TransferPath;
};
