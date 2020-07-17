import { runCommand } from '../../util/command';
import { listOutputFormat, jobsSearchArgumentsDefault, getSearchArgs } from './util';

export = {
	command: 'list',
	desc: 'List all jobs',
	builder: yargs => {
		yargs.options(jobsSearchArgumentsDefault);
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			
			const jobs = await client.jobs.list({
				...getSearchArgs(argv),
				fields: [
					'name',
					'status',
					'disabled',
					'discriminator'
				]
			});
			output.writeTable(jobs, listOutputFormat);
		});
	}
};
