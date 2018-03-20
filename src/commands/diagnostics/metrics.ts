import { runCommand } from '../../util/command';

const outputFormat = {
	table: [
		{
			header: 'Metric',
			property: 'name'
		},
		{
			header: 'Value',
			property: 'value'
		},
		{
			header: 'Type',
			property: 'type'
		}
	]
};

export = {
	command: 'metrics',
	desc: 'List all Diagnostic Metrics',
	builder: yargs => {
		yargs.options({
			'type': {
				alias: 't',
				desc: 'Metric type',
				type: 'string',
				group: 'Search'
			},
			'name': {
				alias: 'm',
				desc: 'Metric name',
				type: 'string',
				group: 'Search'
			},
			'search': {
				alias: 'q',
				desc: 'Search text',
				type: 'string',
				group: 'Search'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const metrics = await client.diagnosticMetrics.list({
				type: argv.type,
				name: argv.name,
				q: argv.search
			});
			
			let mappedMetrics =
				Object.keys(metrics).map(name => {
					const metric = metrics[name];
					return {
						name: name,
						value: metric.value,
						type: metric.type
					};
				});
			output.writeTable(mappedMetrics, outputFormat);
		});
	}
};
