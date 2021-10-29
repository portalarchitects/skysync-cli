import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource}  from './resource';
import { ConfigurationPrompt, PolicyLocationAction, TrackingGroupLocationActions } from '../models';
import { CancellationToken } from '../cancellation-token';

export class PolicyLocationActionsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	private getResourcePath(policyId: string, locationId: string): string {
		return `policies/${policyId}/locations${locationId}/actions`;
	}

	private getResourcePathSingle(policyId: string, locationId: string, trackingGroupActionId: string): string {
		return `${this.getResourcePath(policyId, locationId)}/${trackingGroupActionId}`;
	}

	async getActions(policyId: string, locationId: string, params?: any, token?: CancellationToken): Promise<TrackingGroupLocationActions> {
		const actions = await this.httpClient.get(this.getResourcePath(policyId, locationId), params, token);
		return getTypedResponse<TrackingGroupLocationActions>(actions);
	}

	async getConfigurationPrompt(policyId: string, locationId: string, trackingGroupActionId: string, params?: any, token?: CancellationToken): Promise<ConfigurationPrompt> {
		const prompt = await this.httpClient.get(this.getResourcePathSingle(policyId, locationId, trackingGroupActionId), params, token);
		return getTypedResponse<ConfigurationPrompt>(prompt);
	}

	async add(policyId: string, locationId: string, trackingGroupActionId: string, body: PolicyLocationAction, params?: any, token?: CancellationToken): Promise<PolicyLocationAction> {
		const result = await this.httpClient.post(this.getResourcePathSingle(policyId, locationId, trackingGroupActionId), body, params, token);
		return getTypedResponse<PolicyLocationAction>(result);
	}

	async update(policyId: string, locationId: string, trackingGroupActionId: string, body: PolicyLocationAction, params?: any, token?: CancellationToken): Promise<PolicyLocationAction> {
		const result = await this.httpClient.patch(this.getResourcePathSingle(policyId, locationId, trackingGroupActionId), body, params, token);
		return getTypedResponse<PolicyLocationAction>(result);
	}

	async delete(policyId: string, locationId: string, trackingGroupActionId: string, token?: CancellationToken): Promise<boolean> {
		return await this.httpClient.delete(this.getResourcePathSingle(policyId, locationId, trackingGroupActionId), null, token);
	}
}
