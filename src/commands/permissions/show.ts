import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show permission category',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const permission = await client.permissions.get(argv.id, {
				fields: [
					'all'
				]
			});
			output.writeItem(permission, outputFormat);
		});
	}
};
