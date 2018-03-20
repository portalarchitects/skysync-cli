import { runCommand } from '../../util/command';
import { detailOutputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show template',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const template = await client.templates.get(argv.id, {
				fields: ['id', 'name', 'kind', 'disabled', 'schedule', 'transfer']
			});
			output.writeItem(template, detailOutputFormat);
		});
	}
};
