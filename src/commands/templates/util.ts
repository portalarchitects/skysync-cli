const listOutputFormat = {
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
		'transfer'
	]
};

const detailOutputFormat = {
	table: [
		...listOutputFormat.table
	],
	json: [
		'schedule',
		...listOutputFormat.json		
	]
};

export { listOutputFormat, detailOutputFormat };
