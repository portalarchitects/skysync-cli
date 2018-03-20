import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete template',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.templates.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The job template was deleted successfully.');
			} else {
				output.writeFailure('The job template could not be deleted.');
			}
		});
	}
};
