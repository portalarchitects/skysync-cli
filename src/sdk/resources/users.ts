import { IHttpClient } from '../http';
import { EditableResource, PagedResource } from './resource';
import { User, UserPreference } from '../models';

export class UsersResource extends PagedResource<User> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'user');
	}
}

export class UserPreferencesResource extends EditableResource<UserPreference> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'user_preference');
		this.resourcePath = 'users/me/preferences';
	}
}
