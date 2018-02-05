import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Template } from '../models';

export class TemplatesResource extends PagedResource<Template> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'template', 'job');
	}
}
