import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { User } from '../models';

export class UsersResource extends EditableResource<User> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'user');
	}
}
