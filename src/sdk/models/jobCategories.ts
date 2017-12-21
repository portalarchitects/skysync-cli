import { IEntityIdentifier } from './base';

export interface JobCategory extends IEntityIdentifier<number> {
	name?: string;
}
