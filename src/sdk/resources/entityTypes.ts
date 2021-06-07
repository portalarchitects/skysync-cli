import { IHttpClient } from '../http';
import { getTypedResponse, PagedResource } from './resource';
import { BlockListEntityType, EntityType, EntityTypeEvaluationResult, PatternEntityType } from '../models';
import { CancellationToken } from '../cancellation-token';

export class EntityTypesResource extends PagedResource<EntityType | BlockListEntityType | PatternEntityType> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'entity_type');
	}

	async import(body: FormData, params?: any, token?: CancellationToken): Promise<EntityType[]> {
		const result = await this.httpClient.upload(this.resourcePath, null, body, params, token);
		return getTypedResponse<EntityType[]>(result);
	}

	async test(id: string, body: FormData, params?: any, token?: CancellationToken): Promise<EntityTypeEvaluationResult> {
		const result = await this.httpClient.upload(`${this.resourcePath}/${id}/test`, null, body, params, token);
		return getTypedResponse<EntityTypeEvaluationResult>(result);
	}

	async testAll(body: FormData, params?: any, token?: CancellationToken): Promise<EntityTypeEvaluationResult[]> {
		const result = await this.httpClient.upload(`${this.resourcePath}/test`, null, body, params, token);
		return getTypedResponse<EntityTypeEvaluationResult[]>(result);
	}
}
