import { IHttpClient, createHttpClient } from './http';
import {
	ConnectionsResource,
	ConnectionAccountsResource,
	ConnectionGroupsResource,
	ConnectionItemsResource,
	DiagnosticMetricsResource,
	JobsResource,
	JobExecutionsResource,
	OwnershipGroupsResource,
	PermissionsResource,
	ProfilesResource,
	RolesResource,
	SitesResource,
	StoragePlatformsResource,
	UsersResource,
	AuditCategoriesResource,
	TemplatesResource,
	TransferAuditsResource,
	TransferItemsResource,
	TransferJobStatisticsResource,
	ClusterResource
} from './resources';

export class SkySyncClient {
	private _httpClient: IHttpClient;

	constructor(config?: {
		server?: string;
		username?: string;
		password?: string;
		site?: string;
	});
	constructor(_httpClient: IHttpClient);
	constructor(options: any) {
		if (!options) {
			options = {};
		}
		if (typeof(options.get) === 'function') {
			this._httpClient = options;
		} else {
			const {
				server,
				site,
				...token
			} = options;
			this._httpClient = createHttpClient(server, token, site);
		}
	}

	get httpClient(): IHttpClient {
		return this._httpClient;
	}

	get connections(): ConnectionsResource {
		return new ConnectionsResource(this._httpClient);
	}

	get connectionItems(): ConnectionItemsResource {
		return new ConnectionItemsResource(this._httpClient);
	}

	get connectionAccounts(): ConnectionAccountsResource {
		return new ConnectionAccountsResource(this._httpClient);
	}

	get connectionGroups(): ConnectionGroupsResource {
		return new ConnectionGroupsResource(this._httpClient);
	}

	get diagnosticMetrics(): DiagnosticMetricsResource {
		return new DiagnosticMetricsResource(this._httpClient);
	}
	
	get groups(): OwnershipGroupsResource {
		return new OwnershipGroupsResource(this._httpClient);
	}

	get jobs(): JobsResource {
		return new JobsResource(this._httpClient);
	}

	get jobExecutions(): JobExecutionsResource {
		return new JobExecutionsResource(this._httpClient);
	}

	get transferItems(): TransferItemsResource {
		return new TransferItemsResource(this._httpClient);
	}

	get transferAudits(): TransferAuditsResource {
		return new TransferAuditsResource(this._httpClient);
	}

	get transferStatistics(): TransferJobStatisticsResource {
		return new TransferJobStatisticsResource(this._httpClient);
	}

	get permissions(): PermissionsResource {
		return new PermissionsResource(this._httpClient);
	}

	get profiles(): ProfilesResource {
		return new ProfilesResource(this._httpClient);
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
	
	get templates(): TemplatesResource {
		return new TemplatesResource(this._httpClient);
	}

	get users(): UsersResource {
		return new UsersResource(this._httpClient);
	}

	get auditCategories(): AuditCategoriesResource {
		return new AuditCategoriesResource(this._httpClient);
	}

	get cluster(): ClusterResource {
		return new ClusterResource(this._httpClient);
	}
}
