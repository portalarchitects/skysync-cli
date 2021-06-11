import { IEntityIdentifier } from './base';

export interface Validator extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
}
