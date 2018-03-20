import { runCommand } from '../../util/command';

const outputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'Name',
			property: 'name'
		},
		{
			header: 'Platform',
			property: 'platform.name'
		},
		{
			header: 'Account',
			property: 'account.name'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		}
	],
	json: [
		'platform.id',
		'account.id',
		'account.email'
	]
};

export = {
	command: 'show <id>',
	desc: 'Show connection details',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const connection = await client.connections.get(argv.id);
			output.writeItem(connection, outputFormat);
		});
	}
};
