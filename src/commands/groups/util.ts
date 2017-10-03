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
			header: 'Parent',
			property: 'parent.name'
		}
	],
	json: [
		'parent.id'
	]
};
