import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show remote site',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const site = await client.sites.get(argv.id, {
				fields: [
					'all'
				]
			});
			output.writeItem(site, outputFormat);
		});
	}
}
