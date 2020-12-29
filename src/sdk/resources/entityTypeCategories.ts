import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Category } from '../models';

export class EntityTypeCategoriesResource extends PagedResource<Category> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'entity_type_category', 'entity_type_category', 'entity_type_categories', 'entity_type_categories', 'entity_types/categories');
	}
}
