import { IEntityIdentifier } from './base';

export interface PolicyCategory extends IEntityIdentifier<string> {
	name?: string;
}
