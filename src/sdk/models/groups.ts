import { IEntityIdentifier } from './base';

export interface OwnershipGroup extends IEntityIdentifier<string> {
	name?: string;
	parent?: {
		id: string;
	};
}
