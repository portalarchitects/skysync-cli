import { listArgumentsDefault } from '../util';

const jobsSearchArgumentsDefault = {
	'kind': {
		desc: 'Job Kind',
		type: 'string',
		group: 'Search'
	},
	'active': {
		desc: 'Only retrieve active jobs',
		type: 'boolean',
		group: 'Search',
		default: undefined
	},
	'parent': {
		desc: 'Search by the parent job ID',
		type: 'string',
		group: 'Search'
	},
	...listArgumentsDefault
};

const listOutputFormat = {
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
			header: 'Kind',
			property: 'kind'
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
	],
	json: [
		'schedule'
	]
};

const detailOutputFormat = {
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
			header: 'Kind',
			property: 'kind'
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
	],
	json: [
		'schedule',
		'transfer',
	]
};

const historyOutputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'JobID',
			property: 'job_id'
		},
		{
			header: 'Progress',
			property: 'progress',
			transform: value => {
				if (!value) {
					return '';
				}
				return value.toLocaleString('en', {style: 'percent'});
			}
		},
		{
			header: 'Start',
			property: 'start_time',
			transform: value => new Date(value).toLocaleString('en')
		},
		{
			header: 'End',
			property: 'end_time',
			transform: value => value && new Date(value).toLocaleString('en') || ''
		},
		{
			header: 'Status',
			property: 'status'
		},
		{
			header: 'Node',
			property: 'node_address'
		}
	],
	json: [
		'phase',
		'stats',
		'duration'
	]
};

const auditOutputFormat = {
	table: [
		{
			header: 'Level',
			property: 'level'
		},
		{
			header: 'Event',
			property: 'event'
		},
		{
			header: 'RecordedOn',
			property: 'recorded_on',
			transform: value => new Date(value).toLocaleString('en')
		},
		{
			header: 'Reason',
			property: 'reason'
		}
	],
	json: [
		'execution_id',
		'target'
	]
};

function getSearchArgs(argv): any {
	if (argv.all !== undefined) {
		return {};
	}
	return {kind: argv.kind,
		q: argv.search,
		active: argv.active,
		parent: argv.parent,
		offset: argv.offset,
		limit: argv.limit};
}

function searchCriteriaIsMissing(argv): boolean {
	return argv.all === undefined
		&& argv.parent === undefined
		&& argv.kind === undefined
		&& argv.q === undefined
		&& argv.active === undefined;
}

function formatTotalCount(totalCount): any {
	return {total_count: totalCount};
}

export { jobsSearchArgumentsDefault, listOutputFormat, detailOutputFormat, historyOutputFormat, auditOutputFormat, searchCriteriaIsMissing, getSearchArgs, formatTotalCount };
