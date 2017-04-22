import { IEntityIdentifier } from './base';

export interface Job extends IEntityIdentifier<string> {
	name?: string;
	kind?: string;
	disabled?: boolean;
};
