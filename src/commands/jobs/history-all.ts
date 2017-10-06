import {runCommand} from '../../util/command';
import {historyOutputFormat} from './util';

export = {
	command: 'history all',
	desc: 'Show job history for all jobs',
	builder: yargs => {
		yargs.options({
			'format': {
				default: 'json',
				desc: 'output format',
				type: 'string'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			if (argv.format === 'csv') {
				const result = await client.jobs.getHistoryCsvList(null, {fields: ['all']});
				output.writeCsv(result);
			} else {
				const result = await client.jobs.getHistoryList(null, {fields: ['all']});
				output.writeItem(result, historyOutputFormat);
			}
		});
	}
}
