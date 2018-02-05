import { IEntityIdentifier } from './base';

export interface Template extends IEntityIdentifier<string> {
	kind?: string;
	name?: string;
	disabled?: boolean;
}
