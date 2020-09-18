import { IEntityIdentifier } from './base';

export interface EntityType extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
}
