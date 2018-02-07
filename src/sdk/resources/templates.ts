import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Job } from '../models';

export class TemplatesResource extends PagedResource<Job> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'template', 'job');
	}
}
