import { IHttpClient } from '../http';
import { Resource } from './resource';
import { Permission } from '../models';

export class PermissionsResource extends Resource<Permission> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'permission', 'permission_category', 'permissions', 'permission_categories');
	}
}
