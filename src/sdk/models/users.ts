import { IEntityIdentifier } from './base';
import { OwnershipGroup } from './groups';
import { Role } from './roles'

export interface User extends IEntityIdentifier<string> {
	login?: string;
	password?: string;
	name?: string;
	email?: string;
	disabled?: boolean;
	group?: OwnershipGroup;
	roles?: Role[];
};
