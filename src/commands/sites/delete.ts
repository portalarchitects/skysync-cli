import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete remote site',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.sites.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The site was deleted successfully.');
			} else {
				output.writeFailure('The site could not be deleted.');
			}
		});
	}
}
