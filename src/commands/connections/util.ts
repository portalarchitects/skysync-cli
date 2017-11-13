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
