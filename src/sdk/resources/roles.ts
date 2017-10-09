import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { Permission } from '../models';

export class RolesResource extends EditableResource<Permission> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'role');
	}
}
