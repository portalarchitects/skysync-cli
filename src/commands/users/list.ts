import { runCommand } from '../../util/command';
import { outputFormatWithGroup } from './util';
import { listArgumentsBasic } from '../util';

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
			}, ...listArgumentsBasic
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const users = await client.users.list({
				active: argv.active,
				offset: argv.offset,
				limit: argv.limit,
				fields: 'all'
			});
			output.writeTable(users, outputFormatWithGroup);
		});
	}
}
