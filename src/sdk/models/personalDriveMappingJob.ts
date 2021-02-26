import { AccountMap } from './accountMaps';
import { TransferJob } from './transfers';

export enum PersonalDriveMappingJobConventionMatch {
	Account = 'account',
	Container = 'container',
	Ldap = 'ldap'
}

export enum PersonalDriveMappingJobConventionUsers {
	Source = 'source',
	Destination = 'destination',
	Ldap = 'ldap'
}

export interface PersonalDriveMappingConvention {
	account_map?: AccountMap;
	match?: PersonalDriveMappingJobConventionMatch;
	include_matches?: boolean;
	remove_invalid?: boolean;
	users?: PersonalDriveMappingJobConventionUsers;
	search_domain?: string;
}

export interface PersonalDriveMappingJob extends TransferJob {
	convention?: PersonalDriveMappingConvention;
}
