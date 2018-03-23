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
			header: 'Description',
			property: 'description'	
		},
		{
			header: 'Instructions',
			property: 'instructions'
		},
		{
			header: 'Job Templates',
			property: 'job_templates[].name'
		},
		{
			header: 'Client ID',
			property: 'applications[].client_id'
		},
		{
			header: 'Client Secret',
			property: 'applications[].client_secret'
		}
	],
	json: [
		'job_templates[].id'
	]
};
