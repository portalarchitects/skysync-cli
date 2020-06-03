import { IEntityIdentifier, IAuditedEntity } from './base';
import { TimeInterval } from './time';
import { JobScheduler } from './scheduler';
import { JobCategory } from './jobCategories';
import { JobExecutionStatus, JobSchedule} from './jobs';

export interface Policy extends IEntityIdentifier<string>, IAuditedEntity {
	kind?: string;
	name?: string;
	description?: string;
	category?: JobCategory;
	scheduler?: JobScheduler;
	schedule?: JobSchedule;
	status?: string;
	execute_on?: number;
	previous_execution: PolicyExecution;
	execution: PolicyExecution;
	disabled?: boolean;
}

export interface PolicyExecution {
	policy_id?: string;
	progress?: number;
	phase?: string;
	id?: number;
	start_time?: number;
	end_time?: number;
	duration?: TimeInterval;
	status?: JobExecutionStatus;
	node_address?: string;
}