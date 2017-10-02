import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'list',
	desc: 'List all users',
	builder: yargs => {
		yargs.options({
			'active': {
				desc: 'Only retrieve active users',
				type: 'boolean',
				group: 'Search',
				default: undefined
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
			const users = await client.users.list({
				active: argv.active,
				offset: argv.offset,
				limit: argv.limit
			});
			output.writeTable(users, outputFormat);
		});
	}
}
