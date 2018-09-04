export const outputFormat = {
	table: [
		{
			header: 'License',
			property: 'key'
		},
		{
			header: 'Customer',
			property: 'customer',
			transform: val => `${val.name} (${val.email})`
		},
		{
			header: 'Expired',
			property: 'expired'
		}
	],
	json: [
		'product',
		'edition',
		'customer',
		'features',
		'usage',
		'quota',
		'trial'
	]
};
