import { runCommand } from '../../util/command';

export = {
	command: 'delete <id>',
	desc: 'Delete connection',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasDeleted = await client.connections.delete(argv.id);
			if (wasDeleted) {
				output.writeSuccess('The connection was deleted successfully.');
			} else {
				output.writeFailure('The connection could not be deleted.');
			}
		});
	}
}
