import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Category } from '../models';

export class PolicyCategoriesResource extends PagedResource<Category> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'policy_category', 'policy_category', 'policy_categories', 'policy_categories', 'policies/categories');
	}
}
