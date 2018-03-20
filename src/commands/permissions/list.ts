import { runCommand } from '../../util/command';
import { outputFormat } from './util';
import { listArgumentsSearch } from '../util';

export = {
	command: 'list',
	desc: 'List all permissions',
	builder: yargs => {
		yargs.options(listArgumentsSearch);
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const permissions = await client.permissions.list({
				q: argv.search,
				fields: 'all'
			});
			output.writeTable(permissions, outputFormat);
		});
	}
};
