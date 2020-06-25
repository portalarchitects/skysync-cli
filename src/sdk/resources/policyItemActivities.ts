import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { PolicyItemActivity } from '../models/policies';

export class PolicyItemActivitiesResource extends PagedResource<PolicyItemActivity> {
	constructor(httpClient: IHttpClient, policyId: string) {
		super(httpClient, 'activity', 'activity', 'activities', 'activities', `policies/${policyId}/activities`);
	}
}
