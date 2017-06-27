import { IHttpClient, RequestHttpClient } from './http';
import {
	Resource,
	ConnectionsResource,
	StoragePlatformsResource,
	JobsResource,
	SitesResource
} from './resources';
import * as models from './models';

export const DEFAULT_SERVER_URI = 'http://localhost:9090/';

interface SkySyncConfig {
	server: string;
	username: string;
	password: string;
	site: string;
}

export class SkySyncClient {
	private httpClient: IHttpClient;

	constructor(config: SkySyncConfig);
	constructor(httpClient: IHttpClient);
	constructor(options: any) {
		if (typeof(options.get) === 'function') {
			this.httpClient = options;
		} else {
			this.httpClient = new RequestHttpClient(options.server || DEFAULT_SERVER_URI, options.username, options.password, options.site);
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
}
