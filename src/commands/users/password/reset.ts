import { runCommand } from '../../../util/command';
import { outputFormatID } from '../util';

export = {
	command: 'reset <id> <new-password>',
	desc: 'Reset user\'s password',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const user = await client.users.patch({
					id: argv.id,
					new_password: argv.newPassword
			});
			output.writeItem(user, outputFormatID);
		});
	}
};
