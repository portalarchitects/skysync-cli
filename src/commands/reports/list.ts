import { runCommand } from '../../util/command';
import { listArgumentsDefault } from '../util';
import { outputFormat } from './util';

export = {
	command: 'list',
	desc: 'List all reports',
	builder: yargs => {
		yargs.options(listArgumentsDefault);
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const reports = await client.reports.list({
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit
			});
			output.writeTable(reports, outputFormat);
		});
	}
};
