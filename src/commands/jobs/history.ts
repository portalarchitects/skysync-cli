import {runCommand} from '../../util/command';
import {historyOutputFormat} from './util';

export = {
	command: 'history [id]',
	desc: 'Show job execution history',
	builder: yargs => {
		yargs.options({
			'execution': {
				default: undefined,
				description: 'An execution ID, last or current',
				type: 'string',
				group: 'History'
			},
			'csv': {
				default: undefined,
				desc: 'Output results as CSV',
				type: 'boolean',
				group: 'History'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params: any = {
				fields: ['all']
			};
			if (argv.id) {
				params.job = argv.id;
				if (argv.execution) {
					params.execution = argv.execution;
				}
			} else if (argv.execution) {
				output.writeWarning('Execution parameter ignored.', true);
			}

			if (argv.csv) {
				const result = await client.jobExecutions.downloadCsv(params);
				output.writeText(result);
			} else {
				const result = await client.jobExecutions.list(params);
				output.writeTable(result, historyOutputFormat);
			}
		});
	}
};
