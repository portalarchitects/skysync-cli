import { Account, Connection } from './connections';

export interface SecurityMap {
	name?: string;
	source?: {
		connection?: Connection
	};
	destination?: {
		connection?: Connection
	};
	unmapped_policy?: string;
	map_by?: {
		built_in?: boolean;
		caption?: boolean;
		default?: boolean;
		email?: boolean;
		external_passthrough?: boolean;
		fuzzy?: boolean;
		id?: boolean;
		ldap?: boolean;
		name?: boolean;
		passthrough?: boolean;
		username?: boolean;
	};
}

export interface SecurityMapException {
	source?: Account;
	destination?: Account;
}

export interface SecurityMapExclusion {
	source?: boolean;
	sid?: Account;
}
