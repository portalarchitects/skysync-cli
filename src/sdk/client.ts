import { IHttpClient, createHttpClient } from './http';
import {
	AccountMapsResource,
	ClusterResource,
	ConfigurationResource,
	ConnectionsResource,
	ConnectionAccountsResource,
	ConnectionGroupsResource,
	ConnectionItemsResource,
	ContentCategoriesResource,
	ConventionAuditsResource,
	DiagnosticMetricsResource,
	EntityTypesResource,
	EntityTypeCategoriesResource,
	ExtensionsResource,
	GroupMapsResource,
	JobsResource,
	JobCategoriesResource,
	JobExecutionsResource,
	JobSchedulersResource,
	LicenseResource,
	NotificationsResource,
	OwnershipGroupsResource,
	PermissionsResource,
	PersonalDriveResource,
	PoliciesResource,
	PolicyAuditCategoriesResource,
	PolicyCategoriesResource,
	PolicyAuditsResource,
	PolicyItemsResource,
	PolicyStatisticsResource,
	ProfilesResource,
	RolesResource,
	SitesResource,
	StoragePlatformsResource,
	TemplatesResource,
	TransferAuditCategoriesResource,
	TransferAuditsResource,
	TransferFoldersResource,
	TransferItemsResource,
	TransferJobStatisticsResource,
	TransferPermissionsResource,
	TransferReportsResource,
	TransferReportStatisticsResource,
	TransferSecurityMappingsResource,
	UsersResource,
	UserPreferencesResource, PolicyTrackingGroupsResource,
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
	
	get configuration(): ConfigurationResource {
		return new ConfigurationResource(this._httpClient);
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

	get jobCategories(): JobCategoriesResource {
		return new JobCategoriesResource(this._httpClient);
	}

	get jobExecutions(): JobExecutionsResource {
		return new JobExecutionsResource(this._httpClient);
	}

	get jobSchedulers(): JobSchedulersResource {
		return new JobSchedulersResource(this._httpClient);
	}

	get licensing(): LicenseResource {
		return new LicenseResource(this._httpClient);
	}

	get transferItems(): TransferItemsResource {
		return new TransferItemsResource(this._httpClient);
	}

	get conventionAudits(): ConventionAuditsResource {
		return new ConventionAuditsResource(this._httpClient);
	}

	get transferFolders(): TransferFoldersResource {
		return new TransferFoldersResource(this._httpClient);
	}

	get transferAudits(): TransferAuditsResource {
		return new TransferAuditsResource(this._httpClient);
	}

	get transferSecurityMappings(): TransferSecurityMappingsResource {
		return new TransferSecurityMappingsResource(this._httpClient);
	}

	get transferPermissions(): TransferPermissionsResource {
		return new TransferPermissionsResource(this._httpClient);
	}

	get transferStatistics(): TransferJobStatisticsResource {
		return new TransferJobStatisticsResource(this._httpClient);
	}

	get permissions(): PermissionsResource {
		return new PermissionsResource(this._httpClient);
	}
	
	get personalDrive(): PersonalDriveResource {
		return new PersonalDriveResource(this._httpClient);
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

	get userPreferences(): UserPreferencesResource {
		return new UserPreferencesResource(this._httpClient);
	}

	get transferAuditCategories(): TransferAuditCategoriesResource {
		return new TransferAuditCategoriesResource(this._httpClient);
	}

	get contentCategories(): ContentCategoriesResource {
		return new ContentCategoriesResource(this._httpClient);
	}

	get cluster(): ClusterResource {
		return new ClusterResource(this._httpClient);
	}

	get reports(): TransferReportsResource {
		return new TransferReportsResource(this._httpClient);
	}

	get reportStatistics(): TransferReportStatisticsResource {
		return new TransferReportStatisticsResource(this._httpClient);
	}
	
	get accountMaps(): AccountMapsResource {
		return new AccountMapsResource(this._httpClient);
	}

	get groupMaps(): GroupMapsResource {
		return new GroupMapsResource(this._httpClient);
	}

	get extensions(): ExtensionsResource {
		return new ExtensionsResource(this._httpClient);
	}

	get notifications(): NotificationsResource {
		return new NotificationsResource(this._httpClient);
	}

	get policies(): PoliciesResource {
		return new PoliciesResource(this._httpClient);
	}

	get policyAuditCategories(): PolicyAuditCategoriesResource {
		return new PolicyAuditCategoriesResource(this._httpClient);
	}

	get policyCategories(): PolicyCategoriesResource {
		return new PolicyCategoriesResource(this._httpClient);
	}

	get policyAudits(): PolicyAuditsResource {
		return new PolicyAuditsResource(this._httpClient);
	}

	get policyItems(): PolicyItemsResource {
		return new PolicyItemsResource(this._httpClient);
	}

	get policyStatistics(): PolicyStatisticsResource {
		return new PolicyStatisticsResource(this._httpClient);
	}

	get policyTrackingGroups(): PolicyTrackingGroupsResource {
		return new PolicyTrackingGroupsResource(this._httpClient);
	}

	get entityTypes(): EntityTypesResource {
		return new EntityTypesResource(this._httpClient);
	}

	get entityTypeCategories(): EntityTypeCategoriesResource {
		return new EntityTypeCategoriesResource(this._httpClient);
	}
}
