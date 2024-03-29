export const listArgumentsSearch = {
	'search': {
		alias: 'q',
		desc: 'Search text',
		type: 'string',
		group: 'Search'
	}
};

export const listArgumentsPaging = {
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
	...listArgumentsPaging
};

export function formatTotalCount(totalCount): any {
	return {total_count: totalCount};
}

