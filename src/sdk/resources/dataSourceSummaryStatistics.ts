import { DataSourceSummaryStatistics } from '../models';
import { IHttpClient } from '../http';
import { Resource } from './resource';

export class DataSourceSummaryStatisticsResource extends Resource<DataSourceSummaryStatistics> {
	constructor(httpClient: IHttpClient) {
		const name = 'data_source_summary_stats';
		super(httpClient, name, null, name, null, 'datasources/stats');
	}
} 
