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
			header: 'Enabled',
			property: 'disabled',
			transform: val => !Boolean(val)
		},
		{
			header: 'Type',
			property: 'type'
		}
	]
};
