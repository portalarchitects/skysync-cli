import { Policy, PolicyItemTrackingGroup } from './policies';

export interface PolicyEvaluationResult {
	policy?: Policy;
	group?: PolicyItemTrackingGroup;
	justification: string;
	assigned: boolean;
}
