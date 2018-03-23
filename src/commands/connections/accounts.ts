import { runCommand } from '../../util/command';
import { listArgumentsDefault } from '../util';

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
			header: 'Email',
			property: 'email'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		}
	],
	json: [
		'username',
		'given_name',
		'surname',
		'readonly',
		'admin',
		'external_id'
	]
};

export = {
	command: 'accounts <id>',
	desc: 'Show connection accounts',
	builder: yargs => yargs.options(listArgumentsDefault),
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params: any = {
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit
			};
			const accounts = await client.connectionAccounts.list(argv.id, params);
			output.writeTable(accounts, outputFormat);
		});
	}
};
