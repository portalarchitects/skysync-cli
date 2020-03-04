import { runCommand } from '../../util/command';
import { outputFormat } from './util';
import { listArgumentsDefault } from '../util';

export = {
	command: 'list',
	desc: 'List installed suggestors',
	builder: yargs => yargs.options(listArgumentsDefault),
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const suggestors = await client.suggestors.list({
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit
			});
			output.writeTable(suggestors, outputFormat);
		});
	}
};
