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
			header: 'Platform',
			property: 'platform.name'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		}
	],
	json: [
		'platform.id'
	]
};

export = {
	command: 'list',
	desc: 'List all connections',
	builder: yargs => {
		yargs.options({ 
			'platform': {
				alias: 'p',
				desc: 'Storage platform',
				type: 'string',
				group: 'Search'
			},

			'active': {
				desc: 'Only retrieve active connections',
				type: 'boolean',
				group: 'Search',
				default: undefined
			}, ...listArgumentsDefault
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const connections = await client.connections.list({
				platform: argv.platform,
				q: argv.search,
				active: argv.active,
				offset: argv.offset,
				limit: argv.limit
			});
			output.writeTable(connections, outputFormat);
		});
	}
}
