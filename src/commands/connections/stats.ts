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
	desc: 'Get connection folder statitics',
	builder: yargs => {
		yargs.options({
			'path': {
				default: undefined,
				description: 'Path to folder, root is default',
				type: 'string',
				group: 'Connections'
			},
			'ignoreShared': {
				default: true,
				description: 'Exclude shared folders',
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
			if (argv.path) {
				params.path = argv.path;
			}
			if (argv.ignoreShared) {
				params.ignoreShared = argv.ignoreShared;
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
