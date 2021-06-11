import { runCommand } from '../../util/command';
import { outputFormatWithGroup } from './util';
import { listArgumentsDefault } from '../util';

export = {
	command: 'list',
	desc: 'List all users',
	builder: yargs => {
		yargs.options({
			'status': {
				desc: 'Retrieves users acording to the given status. Status can only be "active" or "disabled"',
				type: 'string',
				group: 'Search',
				default: undefined
			}, ...listArgumentsDefault
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const users = await client.users.list({
				status: argv.status,
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit,
				fields: 'all'
			});
			output.writeTable(users, outputFormatWithGroup);
		});
	}
};
