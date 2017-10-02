import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show group',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const group = await client.groups.get(argv.id, {
				fields: [
					'all'
				]
			});
			output.writeItem(group, outputFormat);
		});
	}
}
