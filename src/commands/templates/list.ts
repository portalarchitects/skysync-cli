import { runCommand } from '../../util/command';
import { listOutputFormat } from './util';
import { listArgumentsDefault } from '../util';

export = {
	command: 'list',
	desc: 'List all job templates',
	builder: yargs => {
		yargs.options({
			'active': {
				desc: 'Only retrieve active job templates',
				type: 'boolean',
				group: 'Search',
				default: undefined
			},
			'kind': {
				desc: 'Only retrieve job templates of the specified kind',
				type: 'string',
				group: 'Search'
			}, ...listArgumentsDefault
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const templates = await client.templates.list({
				active: argv.active,
				kind: argv.kind,
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit,
				fields: ['id', 'name', 'kind', 'disabled', 'schedule']
			});
			output.writeTable(templates, listOutputFormat);
		});
	}
}
