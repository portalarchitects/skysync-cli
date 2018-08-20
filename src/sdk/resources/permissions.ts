import { IHttpClient } from '../http';
import { Resource } from './resource';
import { PermissionCategory } from '../models';

export class PermissionsResource extends Resource<PermissionCategory> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'permission', 'permission_category', 'permissions', 'permission_categories', 'permissions');
	}
}
