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

export const outputFormatWithParent = {
	table: [
		...outputFormat.table,
		{
			header: 'Parent',
			property: 'parent.name'
		}
	],
	json: [
		'parent.id'
	]
};
