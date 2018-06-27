import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete a Job Category',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.jobCategories.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The job category was deleted successfully.');
			} else {
				output.writeFailure('The job category could not be deleted.');
			}
		});
	}
};
