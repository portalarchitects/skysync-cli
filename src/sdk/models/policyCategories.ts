import { IEntityIdentifier } from './base';

export interface PolicyCategory extends IEntityIdentifier<number> {
	name?: string;
}
