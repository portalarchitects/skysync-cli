export const outputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'Category',
			property: 'name'
		},
		{
			header: 'Name',
			property: 'permissions[].name'
		}
	],
	json: [
		'permissions[].id'
	]
};
