import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete a Transfer Audit Category',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.transferAuditCategories.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The audit category was deleted successfully.');
			} else {
				output.writeFailure('The audit category could not be deleted.');
			}
		});
	}
};
