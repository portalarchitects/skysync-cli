import { runCommand } from '../../util/command';
import { listArgumentsDefault } from '../util';
import { outputFormat } from './util';

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
			},
			'pools': {
				desc: 'Only retrieve connection pools',
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
				pools: Boolean(argv.pools),
				offset: argv.offset,
				limit: argv.limit,
				fields: ['name',
					'platform',
					'group',
					'pool']
			});
			output.writeTable(connections, outputFormat);
		});
	}
}
