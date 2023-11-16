import { listArgumentsPaging } from '../util';
import {runCommand} from '../../util/command';
import {itemOutputFormat} from './util';

export = {
	command: 'links',
	desc: 'List detected embedded links',
	builder: yargs => {
		yargs.options({
			...listArgumentsPaging,
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
				offset: argv.offset,
				limit: argv.limit,
				fields: [
					'all'
				]
			};
			
			if (argv.csv) {
				const csv = await client.transferItemEmbeddedLinks.downloadCsv(params);
				output.writeText(csv);
			} else {
				const links = await client.transferItemEmbeddedLinks.list(params);
				output.writeTable(links, itemOutputFormat);
			}
		});
	}
};
