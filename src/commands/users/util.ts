export const outputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'Login',
			property: 'login'
		},
		{
			header: 'Name',
			property: 'name'
		},
		{
			header: 'E-Mail',
			property: 'email'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !Boolean(val)
		},
		{
			header: 'Group',
			property: 'group.name'
		}
	],
	json: [
		'group.id'
	]
};
