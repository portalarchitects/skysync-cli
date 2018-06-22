import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { JobCategory } from '../models';

export class JobCategoriesResource extends PagedResource<JobCategory> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'jobCategory', 'job_category', 'jobCategories', 'job_categories', 'jobs/categories');
	}
}
