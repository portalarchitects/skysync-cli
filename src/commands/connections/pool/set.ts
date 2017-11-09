import { runCommand } from '../../../util/command';
import { outputFormat } from '../util';
const open = require('open')

export = {
	command: 'set <id> <poolId>',
	desc: 'Assign a connection to a connection pool',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const connection = await client.connections.setPool(argv.id,
				{
					id: argv.poolId},
				{
					fields: ['name']
				});
			output.writeItem(connection["connection"], outputFormat);
		});
	}
}
