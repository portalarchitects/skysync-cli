import { IEntityIdentifier } from './base';

export interface TransferPlatformStatistic {
	bytes?: number;
	files?: number;
	folders?: number;
}

export interface TransferPlatformStatistics {
	source?: TransferPlatformStatistic;
	destination?: TransferPlatformStatistic;
}

export interface TransferStatisticsList {
	[key: string]: TransferPlatformStatistics;
}

export type TransferJobStatisticsTimeline = { timestamp: number; stats: TransferStatisticsList; }[];

export interface TransferJobStatistics extends IEntityIdentifier<string> {
	timeline?: TransferJobStatisticsTimeline;
	by_category?: TransferStatisticsList;
	by_status?: TransferStatisticsList;
	processing?: TransferStatisticsList;
	count?: number;
	executions?: number;
	stop_policy?: {
		none?: number;
		pending?: number;
		complete?: number;
	};
}
