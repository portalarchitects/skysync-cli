export const listArgumentsSearch = {
	'search': {
		alias: 'q',
		desc: 'Search text',
		type: 'string',
		group: 'Search'
	}
}

export const listArgumentsBasic = {
	'offset': {
		default: 0,
		desc: 'Search offset',
		type: 'number',
		group: 'Search'
	},

	'limit': {
		default: 20,
		desc: 'Search page size',
		type: 'number',
		group: 'Search'
	}
};

export const listArgumentsDefault = {
	...listArgumentsSearch, 
	...listArgumentsBasic
};

