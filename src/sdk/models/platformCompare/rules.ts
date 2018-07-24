import {
	PlatformComparisonRuleGroup
} from './types';

import {
	ifFeaturePresent,
	ifLengthLessThan,
	ifSizeGreaterThan,
	checkFeatures,
	checkPath,
	availableIfSupported
} from './util';

const comparisonRules: PlatformComparisonRuleGroup[] = [
	{
		id: 'validation',
		name: 'Path validation',
		rules: [
			{
				id: 'max_total_length',
				name: 'Maximum path length',
				compare: checkPath((left, right) => ifLengthLessThan(left, right, 'total.max'))
			},
			{
				id: 'max_segment_length',
				name: 'Segment path length',
				compare: checkPath((left, right) => ifLengthLessThan(left, right, 'segment.max'))
			},
			{
				id: 'max_file_size',
				name: 'Maximum file size',
				compare: checkFeatures((left, right) => ifSizeGreaterThan(left, right, 'max_size'))
			},
			{
				id: 'restricted_types',
				name: 'Restricted types',
				compare: checkPath((left, right) => ifFeaturePresent(left, right, 'invalid_extensions'))
			}
		]
	},
	{
		id: 'lock_propagation',
		name: 'Lock propagation',
		available: (left, right) => availableIfSupported(left, right, 'features.checkout'),
		rules: [
			{
				id: 'lock_propagation',
				name: 'File lock propagation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'checkout'))
			},
			{
				id: 'mirror_lock_owner',
				name: 'Mirror lock ownership',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'checkout.set_owner'))
			}
		]
	}
];

module.exports = comparisonRules;
