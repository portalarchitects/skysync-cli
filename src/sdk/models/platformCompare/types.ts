import { IHaveConnectorFeatures } from '../connections';

export enum PlatformComparisonRuleStatus {
	NotApplicable = 1,
	Compatible = 2,
	NotCompatible = 3
}

export interface PlatformComparisonRuleInformation {
	id?: string;
	name?: string;
}

export interface PlatformComparisonRuleResult extends PlatformComparisonRuleInformation {
	left?: any;
	right?: any;
	status?: PlatformComparisonRuleStatus;
}

export type PlatformComparisonRuleEvaluator = (left: IHaveConnectorFeatures, right: IHaveConnectorFeatures) => PlatformComparisonRuleResult;

export type PlatformComparisonRuleAvailable = (left: IHaveConnectorFeatures, right: IHaveConnectorFeatures) => boolean;

export interface PlatformComparisonRule extends PlatformComparisonRuleInformation {
	id: string;
	name: string;
	compare: PlatformComparisonRuleEvaluator;
	available?: PlatformComparisonRuleAvailable;
}

export interface PlatformComparisonRuleGroupInformation<TRule> extends PlatformComparisonRuleInformation {
	id: string;
	name: string;
	rules: TRule[];
}

export interface PlatformComparisonRuleGroup extends PlatformComparisonRuleGroupInformation<PlatformComparisonRule> {
	available?: PlatformComparisonRuleAvailable;
}

export interface PlatformComparisonRuleGroupResult extends PlatformComparisonRuleGroupInformation<PlatformComparisonRuleResult> {
}
