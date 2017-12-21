import { IEntityIdentifier } from './base';

export interface JobScheduler extends IEntityIdentifier<number> {
	name?: string;
	caption?: string;
}
