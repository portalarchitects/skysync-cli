import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'add <name>',
	desc: 'Add remote site',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const site = await client.sites.add({
				name: argv.name
			});
			output.writeItem(site, outputFormat);
		});
	}
}
