import { runCommand } from '../../util/command';
import { outputFormat } from './util';
import { listArgumentsDefault } from '../util';

export = {
	command: 'list',
	desc: 'List installed extractors',
	builder: yargs => yargs.options(listArgumentsDefault),
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const extractors = await client.extractors.list({
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit
			});
			output.writeTable(extractors, outputFormat);
		});
	}
};
