import { listArgumentsDefault } from '../util';
import {runCommand} from '../../util/command';
import {itemOutputFormat} from './util';

export = {
	command: 'items <id>',
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
		});
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
				output.writeTable(items, itemOutputFormat);
			}
		});
	}
};
