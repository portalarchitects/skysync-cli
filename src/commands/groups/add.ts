import { runCommand } from '../../util/command';
import { outputFormat } from './util';
const open = require('open')

export = {
	command: 'add <name>',
	desc: 'Add group',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const group = await client.groups.add({
				name: argv.name,
			});
			output.writeItem(group, outputFormat);
		});
	}
}
