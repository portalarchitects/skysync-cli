import { IEntityIdentifier } from './base';

export interface RemoteSite extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
	connected?: boolean;
	ip_address?: string;
	timezone?: string;
	version?: string;
	status_updated_on?: number;
	disabled?: boolean;
};
