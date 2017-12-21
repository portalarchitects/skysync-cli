import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { User } from '../models';

export class UsersResource extends PagedResource<User> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'user');
	}
}
