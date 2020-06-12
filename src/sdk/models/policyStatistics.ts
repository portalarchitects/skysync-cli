import { IEntityIdentifier } from './base';

export interface PolicyStatistic {
	name?: string;
	description?: string;
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

export type PolicyJobStatisticsTimeline = { 
	timestamp: number; 
	stats: {
		by_risk?: PolicyStatisticsList;
		by_group?: PolicyStatisticsList;
		by_activity?: PolicyStatisticsList;
	}
}[];

export interface PolicyJobStatistics extends IEntityIdentifier<string> {
	timeline?: PolicyJobStatisticsTimeline;
	by_risk?: PolicyStatisticsList;
	by_group?: PolicyStatisticsList;
	by_activity?: PolicyStatisticsList;
	by_location_health?: PolicyStatisticsList;
	by_flagged_category?: PolicyStatisticsList;
	count?: number;
	locations?: number;
	executions?: number;
}
