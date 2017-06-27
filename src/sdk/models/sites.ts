import { IEntityIdentifier } from './base';

export interface RemoteSite extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
	connected?: boolean;
	disabled?: boolean;
};
