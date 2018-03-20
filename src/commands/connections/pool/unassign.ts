import { runCommand } from '../../../util/command';

export = {
	command: 'unassign <id>',
	desc: 'Remove a connection from connection pools',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const connection = await client.connections.unassignPool(argv.id);
			if (Boolean(connection)) {
				output.writeSuccess('The connection was successfully removed from a connection pool.');
			} else {
				output.writeFailure('An error occurred removing the connection from a connection pool.');
			}
		});
	}
};
