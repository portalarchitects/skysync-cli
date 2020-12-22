import {
	PlatformComparisonRuleGroup
} from './types';

import {
	ifFeaturePresent,
	ifLengthLessThan,
	ifSizeLessThan,
	checkFeatures,
	checkPath,
	availableIfSupported,
	ifFeaturePresentNotCompatible
} from './util';

const comparisonRules: PlatformComparisonRuleGroup[] = [
	{
		id: 'versions',
		name: 'File versions',
		available: (left, right) => availableIfSupported(left, right, x => x?.features?.versioning),
		rules: [
			{
				id: 'version_preservation',
				name: 'Version preservation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.versioning))
			}
		]
	},
	{
		id: 'audit_trail',
		name: 'Audit trail preservation',
		available: (left, right) => availableIfSupported(left, right, x => x?.features),
		rules: [
			{
				id: 'timestamp_preservation',
				name: 'Timestamp preservation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.timestamps))
			},
			{
				id: 'author_preservation',
				name: 'Author/Owner preservation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.audit_trail || x?.impersonation?.per_request))
			}
		]
	},
	{
		id: 'lock_propagation',
		name: 'Lock propagation',
		available: (left, right) => availableIfSupported(left, right, x => x?.features?.checkout),
		rules: [
			{
				id: 'file_lock_propagation',
				name: 'File lock propagation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.checkout))
			},
			{
				id: 'mirror_lock_owner',
				name: 'Mirror lock ownership',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.checkout?.set_owner))
			}
		]
	},
	{
		id: 'validation',
		name: 'Path validation',
		available: (left, right) => availableIfSupported(left, right, x => x?.path?.validation),
		rules: [
			{
				id: 'invalid_characters',
				name: 'Invalid characters',
				compare: checkPath((left, right) => ifFeaturePresentNotCompatible(left, right, x => x?.invalid_characters))
			},
			{
				id: 'max_file_size',
				name: 'File size maximum',
				compare: checkFeatures((left, right) => ifSizeLessThan(left, right, x => x?.max_size))
			},
			{
				id: 'max_total_length',
				name: 'Path length maximum',
				compare: checkPath((left, right) => ifLengthLessThan(left, right, x => x?.total?.max))
			},
			{
				id: 'restricted_types',
				name: 'Restricted types',
				compare: checkPath((left, right) => ifFeaturePresentNotCompatible(left, right, x => x?.invalid_extensions))
			},
			{
				id: 'max_segment_length',
				name: 'Segment path length',
				compare: checkPath((left, right) => ifLengthLessThan(left, right, x => x?.segment?.max))
			}
		]
	},
	{
		id: 'permissions',
		name: 'Permissions',
		available: (left, right) => availableIfSupported(left, right, x => x?.features?.permissions),
		rules: [
			{
				id: 'map_accounts',
				name: 'Account map',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.query_account))
			},
			{
				id: 'map_groups',
				name: 'Group map',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.query_group))
			},
			{
				id: 'permissions_preservation',
				name: 'Permissions preservation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.permissions))
			},
			{
				id: 'impersonation',
				name: 'User impersonation',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.impersonation))
			}
		]
	},
	{
		id: 'metadata',
		name: 'Metadata',
		available: (left, right) => (availableIfSupported(left, right, x => x?.features?.metadata || x?.features?.tags)),
		rules: [
			{
				id: 'map_metadata',
				name: 'Metadata map',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.metadata))
			},
			{
				id: 'tags',
				name: 'Tags map',
				compare: checkFeatures((left, right) => ifFeaturePresent(left, right, x => x?.tags))
			}
		]
	}
];

export default comparisonRules;
