import { runCommand } from '../../../util/command';
import { outputFormat } from '../util';
const open = require('open')

export = {
	command: 'clear <id>',
	desc: 'Remove a connection from connection pools',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasCleared = await client.connections.clearPool(argv.id);
			if (wasCleared) {
				output.writeSuccess('The connection was successfully removed from a connection pool.');
			} else {
				output.writeFailure('An error occurred removing the connection from a connection pool.');
			}
		});
	}
}
