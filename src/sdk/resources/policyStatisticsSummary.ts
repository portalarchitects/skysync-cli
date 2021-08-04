import { PoliciesStatisticsSummary } from '../models';
import { IHttpClient } from '../http';
import { PagedResource } from './resource';

export class PolicyStatisticsSummaryResource extends PagedResource<PoliciesStatisticsSummary> {
	constructor(httpClient: IHttpClient) {
		const name = 'policy_statistics_summary';
		super(httpClient, name, null, name, null, 'policies/stats/summary');
	}
}
