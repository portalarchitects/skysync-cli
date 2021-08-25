import { IEntityIdentifier } from './base';
import { PolicyJobOptions } from './policies';
import { LabelledStatistic, LabelledStatisticList } from './policyStatistics';

export interface DataSourceStatistic extends LabelledStatistic {
	total_items?: number;
	total_bytes?: number;
	items_resolved?: number;
	bytes_resolved?: number;
	items_classified?: number;
	bytes_classified?: number;
	total_cost_exposure?: number;
	total_cost_savings?: number;
}

export type DataSourceStatisticTimeline = {
	timestamp?: number;
	stats?: LabelledStatisticList<DataSourceStatistic>;
}[];

export interface DataSourceStatistics extends IEntityIdentifier<string> {
	data_source_totals?: LabelledStatisticList<DataSourceStatistic>;
	data_source_timeline?: DataSourceStatisticTimeline;
}

export interface DataSourceIndividualStatistics extends DataSourceStatistics {
	data_source?: PolicyJobOptions;
}

export interface DataSourceSummaryStatistics extends DataSourceStatistics {
	data_source_count?: number;
}
