import { runCommand } from '../../util/command';
import { outputFormatWithGroupAndRoles } from './util';

export = {
	command: 'show <id>',
	desc: 'Show user',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const user = await client.users.get(argv.id, {
				fields: [
					'all'
				]
			});
			output.writeItem(user, outputFormatWithGroupAndRoles);
		});
	}
};
