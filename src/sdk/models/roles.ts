import { IEntityIdentifier } from './base';
import { Permission } from './permissions'; 

export interface Role extends IEntityIdentifier<string> {
	name?: string;
	permissions?: Permission[];
}
