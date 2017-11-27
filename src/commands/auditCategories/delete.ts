import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete an Audit Category',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.auditCategories.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The audit category was deleted successfully.');
			} else {
				output.writeFailure('The audit category could not be deleted.');
			}
		});
	}
}
