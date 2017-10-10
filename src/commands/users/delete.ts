import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete user',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.users.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The user was deleted successfully.');
			} else {
				output.writeFailure('The user could not be deleted.');
			}
		});
	}
}
