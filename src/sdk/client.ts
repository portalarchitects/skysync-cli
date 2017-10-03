import { IHttpClient, RequestHttpClient } from './http';
import {
	ConnectionsResource,
	StoragePlatformsResource,
	JobsResource,
	SitesResource,
	UsersResource,
	OwnershipGroupsResource
} from './resources';
import * as models from './models';

export class SkySyncClient {
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

	get storagePlatforms(): StoragePlatformsResource {
		return new StoragePlatformsResource(this.httpClient);
	}

	get jobs(): JobsResource {
		return new JobsResource(this.httpClient);
	}

	get sites(): SitesResource {
		return new SitesResource(this.httpClient);
	}
	
	get users(): UsersResource {
		return new UsersResource(this.httpClient);
	}
	
	get groups(): OwnershipGroupsResource {
		return new OwnershipGroupsResource(this.httpClient);
	}
}
