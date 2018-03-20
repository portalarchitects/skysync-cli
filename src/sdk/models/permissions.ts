import { IEntityIdentifier } from './base';

export interface Permission extends IEntityIdentifier<string> {
	name?: string;
}
