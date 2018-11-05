import { IEntityIdentifier } from './base';
import { Connection, Group } from './connections';

export interface GroupMap extends IEntityIdentifier<string> {
	name?: string;
	source?: {
		connection?: Connection
	};
	destination?: {
		connection?: Connection
	};
}

export interface GroupMapException extends IEntityIdentifier<string> {
	source?: Group;
	destination?: Group;
}

export interface GroupMapExclusion extends IEntityIdentifier<string> {
	source?: boolean;
	sid?: Group;
}

