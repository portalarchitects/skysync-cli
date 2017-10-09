import { runCommand } from '../../util/command';
import { outputFormat } from './util';
import { listArgumentsDefault } from '../util';

export = {
	command: 'list',
	desc: 'List all roles',
	builder: yargs => {
		yargs.options(listArgumentsDefault)
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const roles = await client.roles.list({
				offset: argv.offset,
				limit: argv.limit,
				fields: 'all'
			});
			output.writeTable(roles, outputFormat);
		});
	}
}
