import { IEntityIdentifier } from './base';
import { Account } from './connections';
import { SecurityMap, SecurityMapException, SecurityMapExclusion } from './securityMaps';

export interface AccountMap extends IEntityIdentifier<string>, SecurityMap {
	source?: {
		default?: Account	
	};
	destination?: {
		default?: Account
	};
}

export interface AccountMapException extends IEntityIdentifier<string>, SecurityMapException {
	source?: Account;
	destination?: Account;
}

export interface AccountMapExclusion extends IEntityIdentifier<string>, SecurityMapExclusion {
	sid?: Account;
}
