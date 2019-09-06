import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete extension',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.extensions.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The extension was deleted successfully.');
			} else {
				output.writeFailure('The extension could not be deleted.');
			}
		});
	}
};
