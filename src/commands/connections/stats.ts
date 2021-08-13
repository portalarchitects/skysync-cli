import { runCommand } from '../../util/command';

const outputFormat = {
	table: [
		{
			header: 'Items',
			property: 'item_stats.items.count'
		},
		{
			header: 'Bytes',
			property: 'item_stats.items.bytes'
		},
		{
			header: 'Containers',
			property: 'item_stats.containers.count'
		}
	]
};

export = {
	command: 'stats <id>',
	desc: 'Get connection folder statistics',
	builder: yargs => {
		yargs.options({
			'connectAs': {
				desc: 'Account to impersonate',
				type: 'string',
				group: 'Connections'
			},
			'path': {
				default: undefined,
				description: 'Path to folder, root is default',
				type: 'string',
				group: 'Connections'
			},
			'ignoreShared': {
				default: true,
				description: 'Exclude shared items',
				type: 'boolean',
				group: 'Connections'
			},
			'ignoreHidden': {
				default: true,
				description: 'Exclude hidden items',
				type: 'boolean',
				group: 'Connections'
			},
			'csv': {
				default: undefined,
				desc: 'Output results as CSV',
				type: 'boolean',
				group: 'Connections'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params: any = {
				fields: ['all']
			};
			if (argv.connectAs !== undefined) {
				params.headers = {
					'X-Connect-As': argv.connectAs
				};
			}
			if (argv.path !== undefined) {
				params.path = argv.path;
			}
			if (argv.ignoreShared !== undefined) {
				params.ignoreShared = argv.ignoreShared ? 1 : 0;
			}
			if (argv.ignoreHidden !== undefined) {
				params.ignoreHidden = argv.ignoreHidden ? 1 : 0;
			}

			if (argv.csv) {
				const result = await client.connectionStats.downloadCsv(argv.id, params);
				output.writeText(result);
			} else {
				const result = await client.connectionStats.get(argv.id, params);
				output.writeItem(result, outputFormat);
			}
		});
	}
};
