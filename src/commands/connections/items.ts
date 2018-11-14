import { runCommand } from '../../util/command';
import { listArgumentsDefault } from '../util';
import { itemOutputFormat } from './util';

export = {
	command: 'items <connection>',
	desc: 'Traverse connection items',
	builder: yargs => yargs.options({
		...listArgumentsDefault,
		parent: {
			desc: 'Parent ID',
			type: 'string',
			group: 'Search'
		},
		path: {
			desc: 'Parent Path',
			type: 'string',
			group: 'Search'
		},
		connectAs: {
			desc: 'Account to connect using',
			type: 'string',
			group: 'Search'
		}
	}),
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params = {
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit,
				id: argv.parent,
				path: argv.path,
				headers: argv.connectAs && {
					'X-Connect-As': argv.connectAs
				} || undefined
			};

			const items = await client.connectionItems.list(argv.connection, params);
			output.writeTable(items, itemOutputFormat);
		});
	}
};
