import { IHttpClient, RequestHttpClient } from './http';
import {
	Resource,
	ConnectionsResource,
	StoragePlatformsResource,
	JobsResource
} from './resources';
import * as models from './models';

export const DEFAULT_SERVER_URI = 'http://localhost:9090/';

interface SkySyncConfig {
	server: string;
	username: string;
	password: string;
}

export class SkySyncClient {
	private httpClient: IHttpClient;

	constructor(config: SkySyncConfig);
	constructor(httpCliet: IHttpClient);
	constructor(options: any) {
		if (typeof(options.get) === 'function') {
			this.httpClient = options;
		} else {
			this.httpClient = new RequestHttpClient(options.server || DEFAULT_SERVER_URI, options.username, options.password);
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
}
