import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show template',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const template = await client.templates.get(argv.id, {
				fields: [
					'all'
				]
			});
			output.writeItem(template, outputFormat);
		});
	}
}
