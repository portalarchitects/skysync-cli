import { listArgumentsDefault } from '../util';

export const schedulersSearchArgumentsDefault = {
	'active': {
		desc: 'Only retrieve active job schedulers',
		type: 'boolean',
		group: 'Search',
		default: undefined
	},
	...listArgumentsDefault
};

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
			header: 'Caption',
			property: 'caption'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		},
		{
			header: 'Status',
			property: 'status'
		}
	]
};

export function getSearchArgs(argv): any {
	if (argv.all !== undefined) {
		return {};
	}
	return {
		q: argv.search,
		active: argv.active,
		offset: argv.offset,
		limit: argv.limit
	};
}

export function searchCriteriaIsMissing(argv): boolean {
	return argv.all === undefined
		&& argv.q === undefined
		&& argv.active === undefined;
}
