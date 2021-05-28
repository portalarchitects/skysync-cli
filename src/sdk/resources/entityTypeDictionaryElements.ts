import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { EntityTypeDictionaryElement } from '../models';

export class EntityTypeDictionaryElementsResource extends PagedResource<EntityTypeDictionaryElement> {
	constructor(httpClient: IHttpClient, dictionaryId: string) {
		super(httpClient, 'dictionary_element', 'dictionary_element', 'dictionary_elements', 'dictionary_elements', `entity_types/dictionaries/${dictionaryId}/words`);
	}
}
