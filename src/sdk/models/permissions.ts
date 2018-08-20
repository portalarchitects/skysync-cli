import { IEntityIdentifier } from './base';

export interface PermissionCategory extends IEntityIdentifier<string> {
	name?: string;
	permissions?: Permission[];
}

export interface Permission extends IEntityIdentifier<string> {
	name?: string;
}
