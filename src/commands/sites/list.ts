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
			header: 'Connected',
			property: 'connected',
			transform: val => Boolean(val)
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !Boolean(val)
		}
	]
};

export = {
	command: 'list',
	desc: 'List all remote sites',
	builder: yargs => {
		yargs.options({
			'connected': {
				desc: 'Only retrieve connected sites',
				type: 'boolean',
				group: 'Search'
			},

			'search': {
				alias: 'q',
				desc: 'Search text',
				type: 'string',
				group: 'Search'
			},

			'active': {
				desc: 'Only retrieve active sites',
				type: 'boolean',
				group: 'Search'
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
			const sites = await client.sites.list({
				connected: argv.connected,
				active: argv.active,
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit
			});
			output.writeTable(sites, outputFormat);
		});
	}
}
