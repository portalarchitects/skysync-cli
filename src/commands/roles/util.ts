export const outputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'Name',
			property: 'name'
		}
	]
};

export const detailedOutputFormat = {
	table: [
		...outputFormat.table,
		{
			header: 'Permissions',
			property: 'permissions[].name'
		}
	],
	json: [
		'permissions[].id'
	]
}
