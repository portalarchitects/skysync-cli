import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Permission } from '../models';

export class RolesResource extends PagedResource<Permission> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'role');
	}
}
