import { StoragePlatform } from '../connections';
import {
	PlatformComparisonRuleGroup,
	PlatformComparisonRuleGroupResult
} from './types';
const comparisonRules: PlatformComparisonRuleGroup[] = require('./rules');

export class StoragePlatformComparer {
	static get rules(): PlatformComparisonRuleGroup[] {
		return comparisonRules.slice(0);
	}

	static compare(left: StoragePlatform, right: StoragePlatform): PlatformComparisonRuleGroupResult[] {
		return StoragePlatformComparer.rules.filter(group => !Boolean(group.available) || group.available(left, right))
			.map(group => ({
				id: group.id,
				name: group.name,
				rules: group.rules.map(rule => {
					const result = rule.compare(left, right);
					result.id = rule.id;
					result.name = rule.name;
					return result;
				})
			}));
	}
}
