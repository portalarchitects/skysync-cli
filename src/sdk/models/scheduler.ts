import { IEntityIdentifier } from './base';

export enum JobSchedulerStatus {
	Stopped = 'stop',
	
	Running = 'running',

	Paused = 'paused'
}

export interface JobScheduler extends IEntityIdentifier<number> {
	name?: string;
	caption?: string;
	disabled?: boolean;
	status?: JobSchedulerStatus;
}
