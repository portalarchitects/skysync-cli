import { IEntityIdentifier } from './base';
import { Account, Connection } from './connections';

export interface AccountMap extends IEntityIdentifier<string> {
	name?: string;
	source?: {
		connection?: Connection
	};
	destination?: {
		connection?: Connection
	};
}

export interface AccountMapException extends IEntityIdentifier<string> {
	source?: Account;
	destination?: Account;
}

export interface AccountMapExclusion extends IEntityIdentifier<string> {
	source?: boolean;
	sid?: Account;
}
