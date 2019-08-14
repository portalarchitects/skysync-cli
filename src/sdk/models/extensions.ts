import { IEntityIdentifier } from './base';

export interface Extension extends IEntityIdentifier<string> {
	description?: string;
	version?: string;
	disabled?: boolean;
}
