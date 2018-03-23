import { IEntityIdentifier } from './base';

export interface Profile extends IEntityIdentifier<string> {
	name?: string;
}
