import { listArgumentsDefault } from '../util';
import { util } from '../../sdk';

export const jobsSearchArgumentsDefault = {
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

export const listOutputFormat = {
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

export const detailOutputFormat = {
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

export const historyOutputFormat = {
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

export const auditOutputFormat = {
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

export function getSearchArgs(argv): any {
	if (argv.all !== undefined) {
		return {};
	}
	return {
		kind: argv.kind,
		q: argv.search,
		active: argv.active,
		parent: argv.parent,
		offset: argv.offset,
		limit: argv.limit
	};
}

export function searchCriteriaIsMissing(argv): boolean {
	return argv.all === undefined
		&& argv.parent === undefined
		&& argv.kind === undefined
		&& argv.q === undefined
		&& argv.active === undefined;
}

export function formatTotalCount(totalCount): any {
	return {total_count: totalCount};
}

export const statsOutputFormat = {
	table: [
		{
			header: 'Timestamp',
			property: 'timestamp',
			transform: val => new Intl.DateTimeFormat('en', {month: 'short', day: '2-digit'}).format(val * 1000)
		},
		{
			header: 'Content',
			property: 'stats',
			transform: statTransform('bytes', util.formatBytes)
		},
		{
			header: 'Files',
			property: 'stats',
			transform: statTransform('files')
		},
		{
			header: 'Folders',
			property: 'stats',
			transform: statTransform('folders')
		}
	]
};

export function statTransform(statKey: string, format?: (number: number) => string) {
	if (!format) {
		format = num => num.toLocaleString('en');
	}
	return val => {
		let source = 0, destination = 0;
		Object.keys(val).forEach(key => {
			const stat = val[key];
			source += stat.source[statKey];
			destination += stat.destination[statKey];
		});
		return `(${format(source)} ${('\u2191' as any).gray} ${format(destination)} ${('\u2193' as any).gray})`;
	};
}


const maxPathLength = 50;

function truncatePath(path: string): string {
	const len = path && path.length;
	if (len > maxPathLength) {
		path = '…' + path.substring(len - maxPathLength, len);
	}
	return path;
}

export const itemOutputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'Source',
			property: 'source.path',
			transform: truncatePath
		},
		{
			header: ' ',
			property: 'source_to_destination',
			transform: val => {
				return val ? '\u2192' : '\u2190';
			}
		},
		{
			header: 'Destination',
			property: 'destination.path',
			transform: truncatePath
		},
		{
			header: 'Size',
			property: null,
			transform: val => {
				if (!val) {
					return '';
				}
				const size = !Boolean(val.source_to_destination)
					? (val.source && val.source.bytes)
					: (val.destination && val.destination.bytes);
				if (!size) {
					return '';
				}
				return size && util.formatBytes(size);
			}
		},
		{
			header: 'Status',
			property: 'status'
		}
	],
	json: [
		'source',
		'destination',
		'audit_category',
		'retried',
		'processing',
		'transferred_on'
	]
};
