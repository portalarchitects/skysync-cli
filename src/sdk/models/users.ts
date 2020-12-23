import { IEntityIdentifier } from './base';
import { OwnershipGroup } from './groups';
import { Role } from './roles';

export interface User extends IEntityIdentifier<string> {
	login?: string;
	password?: string;
	old_password?: string;
	new_password?: string;
	name?: string;
	email?: string;
	phone?: string;
	disabled?: boolean;
	group?: OwnershipGroup;
	roles?: Role[];
	notifications?: {
		email?: boolean;
		sms?: boolean;
		notification_types?: string[];
	};
}

export interface UserPreference extends IEntityIdentifier<string> {
	value?: any;
}
