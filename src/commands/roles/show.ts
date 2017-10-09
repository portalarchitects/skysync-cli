import { runCommand } from '../../util/command';
import { detailedOutputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show role',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const role = await client.roles.get(argv.id, {
				fields: [
					'all'
				]
			});
			output.writeItem(role, detailedOutputFormat);
		});
	}
}
