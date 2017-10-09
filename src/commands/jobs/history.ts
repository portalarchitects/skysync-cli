import {runCommand} from '../../util/command';
import {historyOutputFormat} from './util';

export = {
	command: 'history [id]',
	desc: 'Show job execution history',
	builder: yargs => {
		yargs.options({
			'execution': {
				default: undefined,
				description: 'An execution index, last or current',
				type: 'string',
				group: 'History'
			},
			'csv': {
				default: undefined,
				desc: 'Output results as CSV',
				type: 'boolean',
				group: 'History'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let result;

			if (!argv.id && argv.execution && argv.execution.length > 0) {
				output.writeWarning('Execution parameter ignored.', true);
				argv.execution = undefined;
			}

			if (argv.csv) {
				if (argv.execution) {
					result = await client.jobs.getHistoryCsv(argv.id, argv.execution, {include: ['all']});
				} else {
					result = await client.jobs.getHistoryCsvList(argv.id, {fields: ['all']});
				}
				output.writeCsv(result);
			} else {
				if (argv.execution) {
					result = await client.jobs.getHistory(argv.id, argv.execution, {include: ['all']});
				} else {
					result = await client.jobs.getHistoryList(argv.id, {fields: ['all']});
				}
				output.writeItem(result, historyOutputFormat);
			}
		});
	}
}
