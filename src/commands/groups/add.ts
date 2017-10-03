import { runCommand } from '../../util/command';
import { outputFormat } from './util';
const open = require('open')

export = {
	command: 'add <name>',
	desc: 'Add ownership group',
	builder: yargs => {
		yargs.options({
			'parent': {
				desc: 'The ID of the parent ownership group ',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const group = await client.groups.add({
				name: argv.name,
				parent: {
					id: argv.parent
				}
			});
			output.writeItem(group, outputFormat);
		});
	}
}
