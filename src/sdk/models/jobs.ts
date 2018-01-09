import { IEntityIdentifier } from './base';
import { TimeOfDay, TimeInterval } from './time';
import { JobScheduler } from './scheduler';
import { JobCategory } from './jobCategories';

export enum JobScheduleMode {
	Automatic = 'auto',
	Manual = 'manual'
}

export enum JobStatus {
	AwaitingUser = 'awaiting-user',
	Cancelled = 'cancel',
	Complete = 'complete',
	Deleted = 'deleted',
	Failed = 'failed',
	Idle = 'idle',
	NotComplete = 'not-complete',
	Paused = 'paused',
	Running = 'running',
	Started = 'started',
	Success = 'success'
}

export interface RetentionDuration {
	type?: string;
	count?: number;
}

export interface RetentionOptions {
	duration?: RetentionDuration;
	purge_empty?: boolean;
}

export interface JobSchedule {
	mode?: JobScheduleMode;
	start_date?: number;
	end_date?: number;
	start_window?: TimeOfDay;
	end_window?: TimeOfDay;
	repeat_count?: number;
	repeat_interval?: TimeInterval;
	days?: string[];
	run_at?: TimeOfDay;
	max_execution?: TimeInterval;
}

export interface Job extends IEntityIdentifier<string> {
	parent_id?: string;
	kind?: string;
	name?: string;
	description?: string;
	category?: JobCategory;
	scheduler?: JobScheduler;
	schedule?: JobSchedule;
	stop_policy?: string;
	priority?: number;
	status?: string;
	execute_on?: number;
	previous_execution: JobExecution;
	execution: JobExecution;
	retention?: RetentionOptions;
	disabled?: boolean;
}

export interface JobExecutionStatistics {
	bytes?: number;
	files?: number;
	files_pending?: number;
	rate_limits?: number;
	versions?: number;
	versions_pending?: number;
	[name: string]: number;
}

export interface JobFailureStatistics {
	failure?: number;
	critical?: number;
	[name: string]: number;
}

export interface JobExecutionStatisticsSet {
	destination?: JobExecutionStatistics;
	source?: JobExecutionStatistics;
	failures?: JobFailureStatistics;
}

export interface JobExecution {
	job_id?: string;
	progress?: number;
	phase?: string;
	id?: number;
	start_time?: number;
	end_time?: number;
	duration?: TimeInterval;
	status?: string;
	node_address?: string;
	stats?: JobExecutionStatisticsSet;
}
