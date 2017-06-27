import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { RemoteSite } from '../models';

export class SitesResource extends EditableResource<RemoteSite> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'site');
	}
}
