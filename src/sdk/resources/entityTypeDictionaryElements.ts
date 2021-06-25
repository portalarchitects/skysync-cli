import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { EntityTypeDictionaryElement } from '../models';
import { CancellationToken } from '../cancellation-token';

export class EntityTypeDictionaryElementsResource extends PagedResource<EntityTypeDictionaryElement> {
	constructor(httpClient: IHttpClient, dictionaryId: string) {
		super(httpClient, 'dictionary_element', 'dictionary_element', 'dictionary_elements', 'dictionary_elements', `entity_types/dictionaries/${dictionaryId}/words`);
	}

	async import(body: FormData, params?: any, token?: CancellationToken): Promise<void> {
		await this.httpClient.upload(this.resourcePath, null, body, params, token);
	}
}
