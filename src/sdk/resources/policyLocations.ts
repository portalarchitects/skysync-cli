import { PolicyLocation } from '../models';
import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { CancellationToken } from '../cancellation-token';

export class PolicyLocationsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(id: string, params?: any, token?: CancellationToken): Promise<PolicyLocation> {
		const result = await this.httpClient.get(`policies/${id}/locations`, this.mergeDefaultParams(params), token);
		return getTypedResponse<PolicyLocation>(result);
	}
}
