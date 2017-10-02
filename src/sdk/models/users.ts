import { IEntityIdentifier } from './base';
import { Group } from './groups'; 

export interface User extends IEntityIdentifier<string> {
	login?: string;
	password?: string;
	name?: string;
	disabled?: boolean;
	type?: string;	
	group?: Group;
};
