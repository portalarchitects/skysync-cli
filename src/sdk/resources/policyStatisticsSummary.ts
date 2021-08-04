import { PoliciesStatisticsSummary } from '../models';
import { IHttpClient } from '../http';
import { Resource } from './resource';

export class PoliciesStatisticsSummaryResource extends Resource<PoliciesStatisticsSummary> {
	constructor(httpClient: IHttpClient) {
		const name = 'policies_stats_summary';
		super(httpClient, name, null, name, null, 'policies/stats/summary');
	}
} 
