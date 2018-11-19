import { IEntityIdentifier } from './base';
import { Group } from './connections';
import { SecurityMap, SecurityMapException, SecurityMapExclusion } from './securityMaps';

export interface GroupMap extends IEntityIdentifier<string>, SecurityMap {
	source?: {
		default?: Group
	};
	destination?: {
		default?: Group
	};
}

export interface GroupMapException extends IEntityIdentifier<string>, SecurityMapException {
	source?: Group;
	destination?: Group;
}

export interface GroupMapExclusion extends IEntityIdentifier<string>, SecurityMapExclusion {
	sid?: Group;
}

