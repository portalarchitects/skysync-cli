import { listArgumentsDefault } from '../util';
import { util } from '../../sdk';
import {runCommand} from '../../util/command';

const maxPathLength = 50;

const outputFormat = {
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
				return val ? '\u2192' : '\u2190'
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

function truncatePath(path: string): string {
	const len = path && path.length;
	if (len > maxPathLength) {
		path = '…' + path.substring(len - maxPathLength, len);
	}
	return path;
}

export = {
	command: 'items [id]',
	desc: 'Show transfer items',
	builder: yargs => {
		yargs.options({
			...listArgumentsDefault,
			'csv': {
				default: undefined,
				desc: 'Output results as CSV',
				type: 'boolean',
				group: 'Output format'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params: any = {
				job: argv.id,
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit,
				fields: [
					'source',
					'destination',
					'source_to_destination',
					'audit_category',
					'retried',
					'status',
					'processing',
					'transferred_on'
					]
			};
			
			if (argv.csv) {
				const csv = await client.transferItems.downloadCsv(params);
				output.writeText(csv);
			} else {
				const items = await client.transferItems.list(params);
				output.writeTable(items, outputFormat);	
			}
		});
	}
}
