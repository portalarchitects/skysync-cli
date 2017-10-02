import { IEntityIdentifier } from './base';

export interface Group extends IEntityIdentifier<string> {
	name?: string;
	type?: string;	
};
