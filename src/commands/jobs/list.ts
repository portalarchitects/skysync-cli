import { runCommand } from '../../util/command';
import { listOutputFormat } from './util';
import { jobsSearchArgumentsDefault } from './util';

export = {
	command: 'list',
	desc: 'List all jobs',
	builder: yargs => {
		yargs.options({
			...jobsSearchArgumentsDefault
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const jobs = await client.jobs.list({
				kind: argv.kind,
				q: argv.search,
				active: argv.active,
				offset: argv.offset,
				limit: argv.limit,
				fields: [
					'name',
					'status',
					'disabled'
				]
			});
			output.writeTable(jobs, listOutputFormat);
		});
	}
}
