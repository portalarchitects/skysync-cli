import { IHttpClient } from '../http';
import { getTypedResponse, PagedResource } from './resource';
import { BlockListEntityType, EntityType, EntityTypeEvaluationResult, PatternEntityType, PropertySchema } from '../models';
import { CancellationToken } from '../cancellation-token';

export class EntityTypesResource extends PagedResource<EntityType | BlockListEntityType | PatternEntityType> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'entity_type');
	}

	async import(body: FormData, params?: any, token?: CancellationToken): Promise<(EntityType | BlockListEntityType | PatternEntityType)[]> {
		const result = await this.httpClient.upload(this.resourcePath, null, body, params, token);
		return getTypedResponse<EntityType[]>(result);
	}

	async schema(id: string, token?: CancellationToken): Promise<PropertySchema> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/schema`, null, token);
		return getTypedResponse<PropertySchema>(result);
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
