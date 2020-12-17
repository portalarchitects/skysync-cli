import { Policy, PolicyTrackingGroup } from './policies';

export interface PolicyEvaluationResult {
	policy?: Policy;
	group?: PolicyTrackingGroup;
	justification: string;
	assigned: boolean;
}
