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
		}
	]
};

export const outputFormatWithGroup = {
	table: [
		...outputFormat.table,
		{
			header: 'Group',
			property: 'group.name'
		}
	],
	json: [
		'group.id'
	]
};

export const outputFormatWithGroupAndRoles = {
	table: [
		...outputFormatWithGroup.table,
		{
			header: 'Roles',
			property: 'roles[].name'
		},
		{
			header: 'Permissions',
			property: 'permissions[].name'
		}
	],
	json: [
		...outputFormatWithGroup.json,
		'roles[].id',
		'permissions[].id'
	]
}


