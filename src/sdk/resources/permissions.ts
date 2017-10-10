import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { Permission } from '../models';

export class PermissionsResource extends EditableResource<Permission> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'permission', 'permission_category', 'permissions', 'permission_categories');
	}
}
