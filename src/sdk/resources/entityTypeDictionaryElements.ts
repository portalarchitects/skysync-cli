import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { EntityTypeDictionaryElement } from '../models';
import { CancellationToken } from '../cancellation-token';

export class EntityTypeDictionaryElementsResource extends PagedResource<EntityTypeDictionaryElement> {
	constructor(httpClient: IHttpClient, dictionaryId: string) {
		super(httpClient, 'dictionary_element', 'dictionary_element', 'dictionary_elements', 'dictionary_elements', `entity_types/dictionaries/${dictionaryId}/words`);
	}

	import(body: FormData, params?: any, token?: CancellationToken): Promise<void> {
		return this.httpClient.upload(this.resourcePath, body, params, token);
	}
}
