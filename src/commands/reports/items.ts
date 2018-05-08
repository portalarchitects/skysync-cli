import { listArgumentsDefault } from '../util';
import {runCommand} from '../../util/command';
import {itemOutputFormat} from '../jobs/util';

export = {
	command: 'items [id]',
	desc: 'Show transfer items',
	builder: yargs => {
		yargs.options(listArgumentsDefault);
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params: any = {
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
			
			const items = await client.reports.items(argv.id, params);
			output.writeTable(items && items.items, itemOutputFormat);
		});
	}
};
