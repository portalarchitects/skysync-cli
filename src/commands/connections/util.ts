import { DataFormatter } from '../../sdk';

export const outputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'Name',
			property: 'name'
		},
		{
			header: 'Platform',
			property: 'platform.name'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		},
		{
			header: 'IsPool',
			property: 'group'
		},
		{
			header: 'PoolName',
			property: 'pool.name',
		}
	],
	json: [
		'platform.id',
		'pool.id'
	]
};

export const itemOutputFormat = {
	table: [
		{
			header: 'Name',
			property: 'name'
		},
		{
			header: 'Size',
			property: 'bytes',
			transform: val => {
				if (typeof(val) === 'undefined') {
					return '';
				}
				return val && DataFormatter.formatBytes(val);
			}
		},
	],
	json: [
		'id',
		'item_type',
		'etag',
		'hash',
		'owner',
		'content_created_on',
		'created_on',
		'created_by',
		'content_modified_on',
		'modified_on',
		'modified_by'
	]
};
