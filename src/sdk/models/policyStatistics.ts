import { IEntityIdentifier } from './base';

export interface PolicyStatistic {
	name?: string;
	description?: string;
	bytes?: number;
	files?: number;
	folders?: number;
	versions?: number;
	storage?: number;
}

export interface PolicyStatisticList {
	[key: string]: PolicyStatistic;
}

export type PolicyStatisticsTimeline = { 
	timestamp: number; 
	stats: {
		by_risk_level?: PolicyStatisticList;
		by_group?: PolicyStatisticList;
	}
}[];

export interface PolicyStatistics extends IEntityIdentifier<string> {
	timeline?: PolicyStatisticsTimeline;
	by_risk_level?: PolicyStatisticList;
	by_group?: PolicyStatisticList;
	by_audit_category?: PolicyStatisticList;
	count?: number;
	executions?: number;
}
