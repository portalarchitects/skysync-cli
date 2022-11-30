import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource}  from './resource';
import { PolicyLocationRule, TrackingGroupLocationRules } from '../models';
import { CancellationToken } from '../cancellation-token';

export class PolicyLocationRulesResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	private getResourcePath(policyId: string, locationId: string): string {
		return `policies/${policyId}/locations/${locationId}/rule_placeholders`;
	}

	async getRules(policyId: string, locationId: string, params?: any, token?: CancellationToken): Promise<TrackingGroupLocationRules[]> {
		const rules = await this.httpClient.get(this.getResourcePath(policyId, locationId), params, token);
		return getTypedResponse<TrackingGroupLocationRules[]>(rules);
	}

	async update(policyId: string, locationId: string, body: PolicyLocationRule[], params?: any, token?: CancellationToken): Promise<boolean> {
		const response = await this.httpClient.post(this.getResourcePath(policyId, locationId), body, params, token);
		return response?.status === 200;
	}
}
