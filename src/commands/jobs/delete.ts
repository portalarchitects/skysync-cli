import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete job',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.jobs.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The job was deleted successfully.');
			} else {
				output.writeFailure('The job could not be deleted.');
			}
		});
	}
};
