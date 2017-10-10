import { runCommand } from '../../util/command';
import { outputFormatWithParent } from './util';
import { listArgumentsDefault } from '../util';

export = {
	command: 'list',
	desc: 'List all groups',
	builder: yargs => {
		yargs.options({
			'parent': {
				desc: 'Only retrieve ownership groups that belong to the specified ownership group',
				type: 'string',
				group: 'Search'
			}, ...listArgumentsDefault
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const groups = await client.groups.list({
				parent: argv.parent,
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit,
				fields: 'all'
			});
			output.writeTable(groups, outputFormatWithParent);
		});
	}
}
