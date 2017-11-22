import { runCommand } from '../../util/command';
import { listArgumentsDefault } from '../util';
import { outputFormat } from './util'

export = {
	command: 'list',
	desc: 'List all Audit Categories',
	builder: yargs => {
		yargs.options({
			...listArgumentsDefault
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const categories = await client.categories.list({
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit,
				fields: 'all'
			});
			output.writeItem(categories, outputFormat);
		});
	}
}
