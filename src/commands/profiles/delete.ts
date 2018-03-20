import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete profile',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.profiles.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The profile was deleted successfully.');
			} else {
				output.writeFailure('The profile could not be deleted.');
			}
		});
	}
};
