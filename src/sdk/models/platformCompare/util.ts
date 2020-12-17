import {IHaveConnectorFeatures, ConnectionFeatures} from '../connections';
import {formatBytes} from '../../formatting/formatBytes';
import {formatNumber} from '../../formatting/formatNumber';
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

export const availableIfSupported = <T>(left: T, right: T, get: (target: T) => any): boolean => {
	const leftAvailable = Boolean(get(left));
	const rightAvailable = Boolean(get(right));
	return leftAvailable || rightAvailable;
};

export const ifFeaturePresent = <T>(left: T, right: T, get: (target: T) => any): PlatformComparisonRuleResult => {
	const leftAvailable = Boolean(get(left));
	const rightAvailable = Boolean(get(right));
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

export const ifLengthLessThan = <T>(left: T, right: T, get: (target: T) => number): PlatformComparisonRuleResult => {
	const leftNumber = Number(get(left));
	const rightNumber = Number(get(right));
	if (leftNumber || rightNumber) {
		return {
			left: leftNumber ? formatNumber(leftNumber) : false,
			right: rightNumber ? formatNumber(rightNumber) : false,
			status: !rightNumber || leftNumber <= rightNumber ? PlatformComparisonRuleStatus.Compatible : PlatformComparisonRuleStatus.NotCompatible
		};
	}
	return notApplicable();
};

export const ifLengthGreaterThan = <T>(left: T, right: T, get: (target: T) => number): PlatformComparisonRuleResult => {
	const leftNumber = Number(get(left));
	const rightNumber = Number(get(right));
	if (leftNumber || rightNumber) {
		return {
			left: leftNumber ? formatNumber(leftNumber) : false,
			right: rightNumber ? formatNumber(rightNumber) : false,
			status: !rightNumber || leftNumber >= rightNumber ? PlatformComparisonRuleStatus.Compatible : PlatformComparisonRuleStatus.NotCompatible
		};
	}
	return notApplicable();
};

export const ifSizeLessThan = <T>(left: T, right: T, get: (target: T) => number): PlatformComparisonRuleResult => {
	const leftNumber = Number(get(left));
	const rightNumber = Number(get(right));
	if (leftNumber || rightNumber) {
		return {
			left: leftNumber ? formatBytes(leftNumber) : false,
			right: rightNumber ? formatBytes(rightNumber) : false,
			status: !rightNumber || leftNumber <= rightNumber ? PlatformComparisonRuleStatus.Compatible : PlatformComparisonRuleStatus.NotCompatible
		};
	}
	return notApplicable();
};

export const ifSizeGreaterThan = <T>(left: T, right: T, get: (target: T) => number): PlatformComparisonRuleResult => {
	const leftNumber = Number(get(left));
	const rightNumber = Number(get(right));
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
	return (left: IHaveConnectorFeatures, right: IHaveConnectorFeatures): PlatformComparisonRuleResult => {
		const leftFeatures = left?.features;
		const rightFeatures = right?.features;
		if (leftFeatures && rightFeatures) {
			return handler(leftFeatures, rightFeatures);
		}
		return notApplicable();
	};
};

export const checkPath = (handler: (left: any, right: any) => PlatformComparisonRuleResult): PlatformComparisonRuleEvaluator => {
	return (left: IHaveConnectorFeatures, right: IHaveConnectorFeatures): PlatformComparisonRuleResult => {
		const leftPath = left?.path?.validation;
		const rightPath = right?.path?.validation;
		if (leftPath && rightPath) {
			return handler(leftPath, rightPath);
		}
		return notApplicable();
	};
};

export const ifFeaturePresentNotCompatible = <T>(left: T, right: T, get: (target: T) => any): PlatformComparisonRuleResult => {
	const leftAvailable = Boolean(get(left));
	const rightAvailable = Boolean(get(right));
	if (leftAvailable || rightAvailable) {
		const notCompatible = ((leftAvailable && rightAvailable) && left !== right) || !leftAvailable;
		return {
			left: leftAvailable,
			right: rightAvailable,
			status: notCompatible ? PlatformComparisonRuleStatus.NotCompatible : PlatformComparisonRuleStatus.Compatible
		};
	}
	return notApplicable();
};
