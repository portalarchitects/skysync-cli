import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { Category } from '../models';

export class CategoriesResource extends EditableResource<Category> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'category', 'audit_category', 'categories', 'audit_categories', 'transfers/categories');
	}
}
