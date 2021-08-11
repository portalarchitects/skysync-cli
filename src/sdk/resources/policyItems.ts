import {PolicyItemMatchConfidence, PolicyItem} from '../models';
import { IHttpClient } from '../http';
import {getTypedResponse, PagedResource} from './resource';
import { CancellationToken } from '../cancellation-token';

export class PolicyItemsResource extends PagedResource<PolicyItem> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'item', null, 'item', null, 'policies/items');
	}

	downloadCsv(params?: any, token?: CancellationToken): Promise<string> {
		return this.httpClient.get(`${this.resourcePath}.csv`, params, token);
	}

	async matchConfidences(tracking_id: number, token?: CancellationToken): Promise<PolicyItemMatchConfidence[]> {
		const result = await this.httpClient.get(`${this.resourcePath}/${tracking_id}/match_confidences`, null, token);
		return getTypedResponse<PolicyItemMatchConfidence[]>(result, 'item');
	}
}
