import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete report',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.reports.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The report was deleted successfully.');
			} else {
				output.writeFailure('The report could not be deleted.');
			}
		});
	}
};
