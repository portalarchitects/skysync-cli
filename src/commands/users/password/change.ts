import { runCommand } from '../../../util/command';
import { outputFormatID } from '../util';

export = {
	command: 'change <old-password> <new-password>',
	desc: 'Change user\'s password',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const user = await client.users.patch({
					id: 'me',
					old_password: argv.oldPassword,
					new_password: argv.newPassword
			});
			output.writeItem(user, outputFormatID);
		});
	}
};
