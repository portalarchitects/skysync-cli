import { IEntityIdentifier } from './base';

export interface ContentCategory extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
}
