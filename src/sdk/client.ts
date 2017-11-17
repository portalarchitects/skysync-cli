import { IHttpClient, RequestHttpClient } from './http';
import {
	ConnectionsResource,
	JobsResource,
	OwnershipGroupsResource,
	PermissionsResource,
	RolesResource,
	SitesResource,
	StoragePlatformsResource,
	UsersResource
} from './resources';
import * as models from './models';

export class SkySyncClient {
	/* tslint:disable:no-http-string */
	static readonly DEFAULT_SERVER_URI: string = 'http://localhost:9090/';

	private httpClient: IHttpClient;

	constructor(config?: {
		server: string;
		username: string;
		password: string;
		site: string;
	});
	constructor(httpClient: IHttpClient);
	constructor(options: any) {
		if (!options) {
			options = {};
		}
		if (typeof(options.get) === 'function') {
			this.httpClient = options;
		} else {
			this.httpClient = new RequestHttpClient(options.server || SkySyncClient.DEFAULT_SERVER_URI, options.username, options.password, options.site);
		}
	}

	get connections(): ConnectionsResource {
		return new ConnectionsResource(this.httpClient);
	}

	get groups(): OwnershipGroupsResource {
		return new OwnershipGroupsResource(this.httpClient);
	}

	get jobs(): JobsResource {
		return new JobsResource(this.httpClient);
	}

	get permissions(): PermissionsResource {
		return new PermissionsResource(this.httpClient);
	}

	get roles(): RolesResource {
		return new RolesResource(this.httpClient);
	}

	get sites(): SitesResource {
		return new SitesResource(this.httpClient);
	}

	get storagePlatforms(): StoragePlatformsResource {
		return new StoragePlatformsResource(this.httpClient);
	}

	get users(): UsersResource {
		return new UsersResource(this.httpClient);
	}
}
