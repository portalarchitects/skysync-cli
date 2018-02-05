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
			header: 'Kind',
			property: 'kind'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		}
	],
	json: [
		'schedule'
	]
};
