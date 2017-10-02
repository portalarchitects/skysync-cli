import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'list',
	desc: 'List all groups',
	builder: yargs => {
		yargs.options({
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
			const groups = await client.groups.list({
				connected: argv.connected,
				active: argv.active,
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit
			});
			output.writeTable(groups, outputFormat);
		});
	}
}
