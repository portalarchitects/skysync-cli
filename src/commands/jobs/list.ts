import { runCommand } from '../../util/command';
import { listOutputFormat } from './util';

export = {
	command: 'list',
	desc: 'List all jobs',
	builder: yargs => {
		yargs.options({
			'kind': {
				desc: 'Job Kind',
				type: 'string',
				group: 'Search'
			},

			'search': {
				alias: 'q',
				desc: 'Search text',
				type: 'string',
				group: 'Search'
			},

			'offset': {
				default: 0,
				desc: 'Search offset',
				type: 'number',
				group: 'Search'
			},

			'limit': {
				default: 20,
				desc: 'Search page size',
				type: 'number',
				group: 'Search'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const jobs = await client.jobs.list({
				kind: argv.kind,
				q: argv.search,
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
