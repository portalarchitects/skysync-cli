import { IEntityIdentifier } from './base';

export interface Category extends IEntityIdentifier<string> {
	name?: string;
}
