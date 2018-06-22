import { runCommand } from '../../util/command';
import { listArgumentsDefault } from '../util';
import { outputFormat } from './util';

export = {
	command: 'list',
	desc: 'List all Job Categories',
	builder: yargs => {
		yargs.options({
			...listArgumentsDefault
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const jobCategories = await client.jobCategories.list({
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit
			});
			output.writeTable(jobCategories, outputFormat);
		});
	}
};
