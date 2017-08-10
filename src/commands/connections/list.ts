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

			'search': {
				alias: 'q',
				desc: 'Search text',
				type: 'string',
				group: 'Search'
			},

			'active': {
				desc: 'Only retrieve active jobs',
				type: 'boolean',
				group: 'Search',
				default: undefined
			},

			'offset': {
				default: 0,
				desc: 'Search offset',
				type: 'number',
				group: 'Search'
			},

			'limit': {
				default: 20,
				desc: 'Search page size',
				type: 'number',
				group: 'Search'
			}
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
