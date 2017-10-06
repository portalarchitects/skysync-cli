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
			property: 'to_destination',
			transform: value => new Date(value)
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
		}
	],
	json: [
		'source',
		'destination'
	]
};

export { listOutputFormat, detailOutputFormat, historyOutputFormat, auditOutputFormat };

