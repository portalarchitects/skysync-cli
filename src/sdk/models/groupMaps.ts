import { IEntityIdentifier } from './base';
import { Connection } from './connections';

export interface GroupMap extends IEntityIdentifier<string> {
	name?: string;
	source?: {
		connection?: Connection
	};
	destination?: {
		connection?: Connection
	};
}
