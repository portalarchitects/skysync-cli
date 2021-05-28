import { IHttpClient } from '../http';
import { getTypedResponse, PagedResource } from './resource';
import { EntityTypeDictionary } from '../models';
import { CancellationToken } from '../cancellation-token';
import { EntityTypeDictionaryElementsResource } from './entityTypeDictionaryElements';

export class EntityTypeDictionariesResource extends PagedResource<EntityTypeDictionary> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'dictionary', 'dictionary', 'dictionaries', 'dictionaries', 'entity_types/dictionaries');
	}

	elements(dictionaryId: string): EntityTypeDictionaryElementsResource {
		return new EntityTypeDictionaryElementsResource(this.httpClient, dictionaryId);
	}

	async import(body: FormData, params?: any, token?: CancellationToken): Promise<EntityTypeDictionary[]> {
		const result = await this.httpClient.upload(this.resourcePath, null, body, params, token);
		return getTypedResponse<EntityTypeDictionary[]>(result);
	}
}
