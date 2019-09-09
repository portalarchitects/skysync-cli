import { IEntityIdentifier, IAuditedEntity } from './base';
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
	Resumed = 'resume',
	Running = 'running',
	Started = 'start',
	Success = 'success',
	Warn = 'warn'
}

export enum JobExecutionStatus {
	Running = 'running',
	Failing = 'failing',
	Failed = 'failed',
	Completed = 'completed',
	Cancelled = 'cancelled',
	FailedToStart = 'failed_to_start',
	Warning = 'warn',
	NoChangesPerformed = 'no_changes'
}

export enum JobResetType {
	InspectFiltered = 'inspect_filtered',
	InspectShared = 'inspect_shared',
	InspectAll = 'inspect_all',
	Stats = 'stats',
	Permissions = 'permissions',
	Soft = 'soft',
	Hard = 'hard',
	Full = 'full'
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

export interface Job extends IEntityIdentifier<string>, IAuditedEntity {
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
	inspect_filtered?: boolean;
	inspect_shared?: boolean;
	previous_execution: JobExecution;
	execution: JobExecution;
	retention?: RetentionOptions;
	disabled?: boolean;
}

export interface JobExecutionFileStatistics {
	bytes?: number;
	versions?: number;
	files?: number;
	[name: string]: number;
}

export interface JobExecutionStatistics {
	existing?: JobExecutionFileStatistics;
	'new'?: JobExecutionFileStatistics;
	pending?: JobExecutionFileStatistics;
	folders?: number;
	flagged?: number;
	revisions?: number;
	ignored?: number;
	rate_limits?: number;
	[name: string]: any;
}

export interface JobFailureStatistics {
	warnings?: number;
	failures?: number;
	[name: string]: number;
}

export interface JobExecutionStatisticsSet {
	destination?: JobExecutionStatistics;
	source?: JobExecutionStatistics;
	errors?: JobFailureStatistics;
	[name: string]: any;
}

export interface JobExecution {
	job_id?: string;
	progress?: number;
	phase?: string;
	id?: number;
	start_time?: number;
	end_time?: number;
	duration?: TimeInterval;
	status?: JobExecutionStatus;
	node_address?: string;
	stats?: JobExecutionStatisticsSet;
	inspect_filtered?: boolean;
	inspect_shared?: boolean;
}
