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
			header: 'Connected',
			property: 'connected',
			transform: val => Boolean(val)
		},
		{
			header: 'IP Address',
			property: 'ip_address'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !Boolean(val)
		}
	],
	json: [
		'status_updated_on'
	]
};
