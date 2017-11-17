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
			header: 'JobID',
			property: 'job_id'
		},
		{
			header: 'Progress',
			property: 'progress'
		},
		{
			header: 'Phase',
			property: 'phase'
		},
		{
			header: 'StartTime',
			property: 'start_time',
			transform: value => new Date(value)
		},
		{
			header: 'EndTime',
			property: 'end_time',
			transform: value => new Date(value)
		},
		{
			header: 'Status',
			property: 'status'
		},
		{
			header: 'NodeAddress',
			property: 'node_address'
		}
	],
	json: [
		'stats',
		'duration'
	]
};

const auditOutputFormat = {
	table: [
		{
			header: 'JobID',
			property: 'job_id'
		},
		{
			header: 'ExecutionID',
			property: 'execution_id'
		},
		{
			header: 'FromSource',
			property: 'from_source'
		},
		{
			header: 'ToDestination',
			property: 'to_destination'
		},
		{
			header: 'RecordedOn',
			property: 'recorded_on',
			transform: value => new Date(value)
		},
		{
			header: 'Level',
			property: 'level'
		},
		{
			header: 'Event',
			property: 'event'
		},
		{
			header: 'Reason',
			property: 'reason'
		}
	],
	json: [
		'source',
		'destination'
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

export { jobsSearchArgumentsDefault, listOutputFormat, detailOutputFormat, historyOutputFormat, auditOutputFormat, searchCriteriaIsMissing, getSearchArgs };
