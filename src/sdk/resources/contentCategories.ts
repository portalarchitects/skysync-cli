import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Category } from '../models';

export class ContentCategoriesResource extends PagedResource<Category> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'contentCategory', 'content_category', 'contentCategories', 'content_categories', 'filters/categories');
	}
}
