import { IHttpClient } from '../http';
import { getTypedResponse, PagedResource } from './resource';
import { BlockListEntityType, EntityType, EntityTypeEvaluationResult, PatternEntityType, PropertySchema } from '../models';
import { CancellationToken } from '../cancellation-token';

export class EntityTypesResource extends PagedResource<EntityType | BlockListEntityType | PatternEntityType> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'entity_type');
	}

	async import(body: FormData, params?: any, token?: CancellationToken): Promise<(EntityType | BlockListEntityType | PatternEntityType)[]> {
		const result = await this.httpClient.upload(this.resourcePath, body, params, token);
		return getTypedResponse<EntityType[]>(result);
	}

	async schema(id: string, token?: CancellationToken): Promise<PropertySchema> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}/schema`, null, token);
		return getTypedResponse<PropertySchema>(result);
	}

	async test(id: string, body: FormData, params?: any, token?: CancellationToken): Promise<EntityTypeEvaluationResult> {
		const result = await this.httpClient.upload(`${this.resourcePath}/${id}/test`, body, params, token);
		return getTypedResponse<EntityTypeEvaluationResult>(result);
	}

	async testAll(body: FormData, params?: any, token?: CancellationToken): Promise<EntityTypeEvaluationResult[]> {
		const result = await this.httpClient.upload(`${this.resourcePath}/test`, body, params, token);
		return getTypedResponse<EntityTypeEvaluationResult[]>(result);
	}

	async clone(id: string, body?: EntityType, params?: any, token?: CancellationToken): Promise<EntityType> {
		const result = await this.httpClient.post(`${this.resourcePath}/${id}/clone`, body, params, token);
		return this.getSingle(result);
	}
}
