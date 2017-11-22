import { IHttpClient, RequestHttpClient } from './http';
import {
	ConnectionsResource,
	JobsResource,
	OwnershipGroupsResource,
	PermissionsResource,
	RolesResource,
	SitesResource,
	StoragePlatformsResource,
	UsersResource,
	CategoriesResource
} from './resources';
import * as models from './models';

export class SkySyncClient {
	/* tslint:disable:no-http-string */
	static readonly DEFAULT_SERVER_URI: string = 'http://localhost:9090/';

	private _httpClient: IHttpClient;

	constructor(config?: {
		server: string;
		username: string;
		password: string;
		site: string;
	});
	constructor(_httpClient: IHttpClient);
	constructor(options: any) {
		if (!options) {
			options = {};
		}
		if (typeof(options.get) === 'function') {
			this._httpClient = options;
		} else {
			this._httpClient = new RequestHttpClient(options.server || SkySyncClient.DEFAULT_SERVER_URI, options.username, options.password, options.site);
		}
	}

	get httpClient(): IHttpClient {
		return this._httpClient;
	}

	get connections(): ConnectionsResource {
		return new ConnectionsResource(this._httpClient);
	}

	get groups(): OwnershipGroupsResource {
		return new OwnershipGroupsResource(this._httpClient);
	}

	get jobs(): JobsResource {
		return new JobsResource(this._httpClient);
	}

	get permissions(): PermissionsResource {
		return new PermissionsResource(this._httpClient);
	}

	get roles(): RolesResource {
		return new RolesResource(this._httpClient);
	}

	get sites(): SitesResource {
		return new SitesResource(this._httpClient);
	}

	get storagePlatforms(): StoragePlatformsResource {
		return new StoragePlatformsResource(this._httpClient);
	}

	get users(): UsersResource {
		return new UsersResource(this._httpClient);
	}

	get categories(): CategoriesResource {
		return new CategoriesResource(this._httpClient);
	}
}
