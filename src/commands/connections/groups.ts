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
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		}
	],
	json: [
		'caption',
		'readonly',
		'admin',
		'external_id'
	]
};

export = {
	command: 'groups <id>',
	desc: 'Show connection groups',
	builder: yargs => yargs.options(listArgumentsDefault),
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params: any = {
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit
			};
			const groups = await client.connectionGroups.list(argv.id, params);
			output.writeTable(groups, outputFormat);
		});
	}
}
