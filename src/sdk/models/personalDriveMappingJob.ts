import { TransferJob } from './transfers';

export enum PersonalDriveMappingJobConventionMatch {
	Account = 'account',
	Container = 'container',
	Ldap = 'ldap'
}

export enum PersonalDriveMappingJobConventionUnmappedPolicy {
	Ignore = 'ignore',
	WarnAndSkip = 'warn',
	Provision = 'add'
}

export enum PersonalDriveMappingJobConventionUsers {
	Source = 'source',
	Destination = 'destination',
	Ldap = 'ldap'
}

export interface PersonalDriveMappingConvention {
	match?: PersonalDriveMappingJobConventionMatch;
	include_matches?: boolean;
	remove_invalid?: boolean;
	unmapped_policy?: PersonalDriveMappingJobConventionUnmappedPolicy;
	users?: PersonalDriveMappingJobConventionUsers;
	search_domain?: string;
	map_by?: {
		caption?: boolean;
		default?: boolean;
		email?: boolean;
		fuzzy?: boolean;
		id?: boolean;
		ldap?: boolean;
		name?: boolean;
		username?: boolean;
	};
}

export interface PersonalDriveMappingJob extends TransferJob {
	convention?: PersonalDriveMappingConvention;
}
