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
			header: 'ParentPool',
			property: 'pool.id'
		}
	],
	json: [
		'platform.id'
	]
};
