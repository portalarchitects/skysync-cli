import { runCommand } from '../../../util/command';
import { outputFormat } from './util'

export = {
	command: 'list',
	desc: 'List all Diagnostic Metrics',
	builder: yargs => {
		yargs.options({
			'type': {
				desc: 'Metric Type',
				type: 'string',
				group: 'Search',
				default: undefined
			},
			'name': {
				desc: 'Metric name',
				type: 'string',
				group: 'Search',
				default: undefined
			},
			'search': {
				alias: 'q',
				desc: 'Search text',
				type: 'string',
				group: 'Search'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const metrics = await client.diagnosticMetrics.list({
				type: argv.type,
				name: argv.name,
				q: argv.search
			});
			output.writeItem(metrics, outputFormat);
		});
	}
}
