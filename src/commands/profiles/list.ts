import { runCommand } from '../../util/command';
import { outputFormat } from './util';
import { listArgumentsDefault } from '../util';

export = {
	command: 'list',
	desc: 'List all profiles',
	builder: yargs => {
		yargs.options(listArgumentsDefault)
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const profiles = await client.profiles.list({
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit
			});
			output.writeTable(profiles, outputFormat);
		});
	}
}
