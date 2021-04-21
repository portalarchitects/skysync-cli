import { IEntityIdentifier } from './base';

export interface LabelledStatistic {
	name?: string;
	description?: string;
	priority?: number;
}

export interface LabelledStatisticList<TStatistic extends LabelledStatistic> {
	[key: string]: TStatistic;
}

export interface StatisticValue {
	bytes?: number;
	files?: number;
	folders?: number;
	versions?: number;
	storage?: number;
}

export interface LocationStatistic extends LabelledStatistic, StatisticValue {
}

export enum RemediationStatus {
	NotRemediated = 'not_remediated',
	Remediated = 'remediated',
	Mitigated = 'mitigated'
}

export enum PolicyAssignmentStatus {
	Pending = 'pending',
	ActionNeeded = 'action-needed',
	Failed = 'failed',
	Processing = 'processing',
	Complete = 'complete'
}

export interface PolicyStatistic extends LabelledStatistic, StatisticValue {
	not_remediated?: StatisticValue;
	remediated?: StatisticValue;
}

export type PolicyStatisticsTimeline = { 
	timestamp?: number;
	stats?: LabelledStatisticList<PolicyStatistic>;
}[];

export interface PolicyStatistics extends IEntityIdentifier<string> {
	count?: number;
	executions?: number;
	risk_timeline?: PolicyStatisticsTimeline;
	by_status?: LabelledStatisticList<LocationStatistic>;
	by_content_category?: LabelledStatisticList<LocationStatistic>;
	by_ext?: LabelledStatisticList<LocationStatistic>;
	by_depth?: LabelledStatisticList<LocationStatistic>;
	by_size?: LabelledStatisticList<LocationStatistic>;
	by_age?: LabelledStatisticList<LocationStatistic>;
	by_versions?: LabelledStatisticList<LocationStatistic>;
	by_risk?: LabelledStatisticList<PolicyStatistic>;
	by_policy_status?: LabelledStatisticList<PolicyStatistic>;
	by_group?: LabelledStatisticList<PolicyStatistic>;
	by_audit_category?: LabelledStatisticList<LocationStatistic>;
}
