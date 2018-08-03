import { 
	get,
	difference
} from 'lodash';
import { StoragePlatform, ConnectionFeatures } from '../connections';
import { formatBytes } from '../../formatting/formatBytes';
import { formatNumber } from '../../formatting/formatNumber';
import {
	PlatformComparisonRuleStatus,
	PlatformComparisonRuleResult,
	PlatformComparisonRuleEvaluator
} from './types';

export const notApplicable = () => ({
	left: false,
	right: false,
	status: PlatformComparisonRuleStatus.NotApplicable
});

export const availableIfSupported = (left: any, right: any, key: string): boolean => {
	const leftAvailable = Boolean(get(left, key));
	const rightAvailable = Boolean(get(right, key));
	return leftAvailable || rightAvailable;
};

export const ifFeaturePresent = (left: any, right: any, key: string): PlatformComparisonRuleResult => {
	const leftAvailable = Boolean(get(left, key));
	const rightAvailable = Boolean(get(right, key));
	if (leftAvailable || rightAvailable) {
		const compatible = (leftAvailable && rightAvailable) || !leftAvailable;
		return {
			left: leftAvailable,
			right: rightAvailable,
			status: compatible ? PlatformComparisonRuleStatus.Compatible : PlatformComparisonRuleStatus.NotCompatible
		};
	}
	return notApplicable();
};

export const ifLengthLessThan = (left: any, right: any, key: string): PlatformComparisonRuleResult => {
	const leftNumber = Number(get(left, key));
	const rightNumber = Number(get(right, key));
	if (leftNumber || rightNumber) {
		return {
			left: leftNumber ? formatNumber(leftNumber) : false,
			right: rightNumber ? formatNumber(rightNumber) : false,
			status: !rightNumber || leftNumber <= rightNumber ? PlatformComparisonRuleStatus.Compatible : PlatformComparisonRuleStatus.NotCompatible
		};
	}
	return notApplicable();
};

export const ifLengthGreaterThan = (left: any, right: any, key: string): PlatformComparisonRuleResult => {
	const leftNumber = Number(get(left, key));
	const rightNumber = Number(get(right, key));
	if (leftNumber || rightNumber) {
		return {
			left: leftNumber ? formatNumber(leftNumber) : false,
			right: rightNumber ? formatNumber(rightNumber) : false,
			status: !rightNumber || leftNumber >= rightNumber ? PlatformComparisonRuleStatus.Compatible : PlatformComparisonRuleStatus.NotCompatible
		};
	}
	return notApplicable();
};

export const ifSizeGreaterThan = (left: any, right: any, key: string): PlatformComparisonRuleResult => {
	const leftNumber = Number(get(left, key));
	const rightNumber = Number(get(right, key));
	if (leftNumber || rightNumber) {
		return {
			left: leftNumber ? formatBytes(leftNumber) : false,
			right: rightNumber ? formatBytes(rightNumber) : false,
			status: !rightNumber || leftNumber >= rightNumber ? PlatformComparisonRuleStatus.Compatible : PlatformComparisonRuleStatus.NotCompatible
		};
	}
	return notApplicable();
};

export const checkFeatures = (handler: (left: ConnectionFeatures, right: ConnectionFeatures) => PlatformComparisonRuleResult): PlatformComparisonRuleEvaluator => {
	return (left: StoragePlatform, right: StoragePlatform): PlatformComparisonRuleResult => {
		const leftFeatures = left && left.features;
		const rightFeatures = right && right.features;
		if (leftFeatures && rightFeatures) {
			return handler(leftFeatures, rightFeatures);
		}
		return notApplicable();
	};
};

export const checkPath = (handler: (left: any, right: any) => PlatformComparisonRuleResult): PlatformComparisonRuleEvaluator => {
	return (left: StoragePlatform, right: StoragePlatform): PlatformComparisonRuleResult => {
		const leftPath = left && left.path && left.path.validation;
		const rightPath = right && right.path && right.path.validation;
		if (leftPath && rightPath) {
			return handler(leftPath, rightPath);
		}
		return notApplicable();
	};
};

export const ifStringArrayExists = (left: any, right: any, key: string): PlatformComparisonRuleResult => {
	const leftStringArray = Array(get(left, key));
	const rightStringArray = Array(get(right, key));
	if (leftStringArray || rightStringArray) {
		return {
			left: leftStringArray,
			right: rightStringArray,
			status: difference(rightStringArray, leftStringArray).length === 0 ? PlatformComparisonRuleStatus.Compatible : PlatformComparisonRuleStatus.NotCompatible
		};
	}
	return notApplicable();
};
