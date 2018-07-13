import { IEntityIdentifier } from './base';

export interface ConventionAuditEntry extends IEntityIdentifier<number> {
	job_id?: string;
	execution_id?: number;
	from_source?: boolean;
	to_source?: boolean;
	from_destination?: boolean;
	to_destination?: boolean;
	level?: string;
	type?: string;
	discriminator?: string;
	message?: string;
	recorded_on?: number;
}
