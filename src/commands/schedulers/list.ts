import { runCommand } from '../../util/command';
import { outputFormat, schedulersSearchArgumentsDefault, getSearchArgs } from './util';

export = {
	command: 'list',
	desc: 'List all job schedulers',
	builder: yargs => {
		yargs.options(schedulersSearchArgumentsDefault);
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const jobSchedulers = await client.jobSchedulers.list({
				...getSearchArgs(argv),
				fields: 'all'
			});
			output.writeTable(jobSchedulers, outputFormat);
		});
	}
};
