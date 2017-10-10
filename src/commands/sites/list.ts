import { runCommand } from '../../util/command';
import { outputFormat } from './util';
import { listArgumentsDefault } from '../util';

export = {
	command: 'list',
	desc: 'List all remote sites',
	builder: yargs => {
		yargs.options({
			'connected': {
				desc: 'Only retrieve connected sites',
				type: 'boolean',
				group: 'Search',
				default: undefined
			},

			'active': {
				desc: 'Only retrieve active sites',
				type: 'boolean',
				group: 'Search',
				default: undefined
			}, ...listArgumentsDefault
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
