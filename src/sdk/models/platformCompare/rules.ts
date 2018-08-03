import {
	PlatformComparisonRuleGroup
} from './types';

import {
	ifFeaturePresent,
	ifLengthLessThan,
	ifSizeGreaterThan,
	checkFeatures,
	checkPath,
	availableIfSupported,
	ifStringArrayExists
} from './util';

const comparisonRules: PlatformComparisonRuleGroup[] = [
	{
		id: 'versions',
		name: 'File versions',
		available: (left, right) => availableIfSupported(left, right, 'features.versioning'),
		rules: [
			{
				id: 'version_preservation',
				name: 'Version preservation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'versioning'))
			}
		]
	},
	{
		id: 'lock_propagation',
		name: 'Lock propagation',
		available: (left, right) => availableIfSupported(left, right, 'features.checkout'),
		rules: [
			{
				id: 'file_lock_propagation',
				name: 'File lock propagation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'checkout'))
			},
			{
				id: 'mirror_lock_owner',
				name: 'Mirror lock ownership',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'checkout.set_owner'))
			}
		]
	},
	{
		id: 'validation',
		name: 'Path validation',
		available: (left, right) => availableIfSupported(left, right, 'path.validation'),
		rules: [
			{
				id: 'invalid_characters',
				name: 'Invalid characters',
				compare: checkPath((left, right) => ifStringArrayExists(left, right, 'invalid_characters'))
			},
			{
				id: 'max_file_size',
				name: 'File size maximum',
				compare: checkFeatures((left, right) => ifSizeGreaterThan(left, right, 'max_size'))
			},
			{
				id: 'max_total_length',
				name: 'Path length maximum',
				compare: checkPath((left, right) => ifLengthLessThan(left, right, 'total.max'))
			},
			{
				id: 'restricted_types',
				name: 'Restricted types',
				compare: checkPath((left, right) => ifFeaturePresent(left, right, 'invalid_extensions'))
			},
			{
				id: 'max_segment_length',
				name: 'Segment path length',
				compare: checkPath((left, right) => ifLengthLessThan(left, right, 'segment.max'))
			}
		]
	},
	{
		id: 'permissions',
		name: 'Permissions',
		available: (left, right) => availableIfSupported(left, right, 'features.permissions'),
		rules: [
			{
				id: 'author_preservation',
				name: 'Author-Owner preservation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'native_copy.ownership'))
			},

			{
				id: 'map_accounts',
				name: 'Map accounts',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'query_account'))
			},
			{
				id: 'map_groups',
				name: 'Map groups',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'query_group'))
			},
			{
				id: 'permissions_preservation',
				name: 'Permissions preservation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'permissions'))
			},
			{
				id: 'impersonation',
				name: 'User impersonation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'impersonation'))
			}
		]
	},
	{
		id: 'metadata',
		name: 'Metadata',
		available: (left, right) => availableIfSupported(left, right, 'features.metadata'),
		rules: [
			{
				id: 'map_metadata',
				name: 'Map metadata',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'metadata'))
			},
			{
				id: 'tags',
				name: 'Map tags',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, 'tags'))
			}
		]
	}
];

module.exports = comparisonRules;
