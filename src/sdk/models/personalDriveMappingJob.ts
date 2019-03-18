import { TransferJob } from "./transfers";

export enum PersonalDriveMappingJobConventionMatch {
	Account = 'account',
	Container = 'container',
	Ldap = 'ldap'
}

export interface PersonalDriveMappingConvention {
	match?: PersonalDriveMappingJobConventionMatch;
	include_matches?: boolean;
}

export interface PersonalDriveMappingJob extends TransferJob {
	convention?: PersonalDriveMappingConvention;
}
