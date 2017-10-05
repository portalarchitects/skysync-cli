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

export { listOutputFormat, detailOutputFormat, historyOutputFormat };
