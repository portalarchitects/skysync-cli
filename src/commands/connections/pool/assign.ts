import { runCommand } from '../../../util/command';

const outputFormat = {
	table: [
		{
			header: 'ConnectionID',
			property: 'id'
		},
		{
			header: 'ConnectionName',
			property: 'name'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		},
		{
			header: 'PoolID',
			property: 'pool.id'
		},
		{
			header: 'PoolName',
			property: 'pool.name',
		}
	]
};

export = {
	command: 'assign <id>',
	desc: 'Assign a connection to an existing connection pool, or create one if it does not exist.',
	builder: yargs => {
		yargs.options({
			'pool': {
				desc: 'Existing Connection Pool ID',
				type: 'string',
			},
			'name': {
				desc: 'New or Existing Connection Pool Name',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const connection = await client.connections.assignPool(argv.id,
				{
					id: argv.pool,
					name: argv.name
				},
				{
					fields: ['name', 'disabled', 'pool.id', 'pool.name']
				});
			output.writeItem(connection, outputFormat);
		});
	}
};
