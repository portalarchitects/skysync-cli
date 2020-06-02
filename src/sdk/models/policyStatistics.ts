import { IEntityIdentifier } from './base';

export interface PolicyStatistic {
	bytes?: number;
	files?: number;
	folders?: number;
	versions?: number;
	storage?: number;
	cost_savings?: number;
}

export interface PolicyStatisticsList {
	[key: string]: PolicyStatistic;
}

export type PolicyJobStatisticsTimeline = { timestamp: number; stats: PolicyStatisticsList; }[];

export interface PolicyJobStatistics extends IEntityIdentifier<string> {
	timeline?: PolicyJobStatisticsTimeline;
	by_risk?: PolicyStatisticsList;
	by_location_health?: PolicyStatisticsList;
	by_flagged_category?: PolicyStatisticsList;
	by_activity?: PolicyStatisticsList;
	count?: number;
	executions?: number;
	stop_policy?: {
		none?: number;
		pending?: number;
		complete?: number;
	};
}
