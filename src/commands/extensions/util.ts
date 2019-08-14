export const outputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'Description',
			property: 'description'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		}
	]
};
