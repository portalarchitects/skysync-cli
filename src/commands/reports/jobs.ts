import { runCommand } from '../../util/command';
import { listOutputFormat, jobsSearchArgumentsDefault, getSearchArgs } from '../jobs/util';

export = {
	command: 'jobs <id>',
	desc: 'List all jobs in report',
	builder: yargs => {
		yargs.options(jobsSearchArgumentsDefault);
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const jobs = await client.reports.jobs({
				...getSearchArgs(argv),
				fields: [
					'name',
					'status',
					'disabled'
				]
			});
			output.writeTable(jobs && jobs.items, listOutputFormat);
		});
	}
};
