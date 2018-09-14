import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { ContentCategory } from '../models';

export class ContentCategoriesResource extends PagedResource<ContentCategory> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'contentCategory', 'content_category', 'contentCategories', 'content_categories', 'filters/categories');
	}
}
