import {runCommand} from '../../util/command';
import {historyOutputFormat} from './util';

export = {
	command: 'history <id|all>',
	desc: 'Show execution history for a specific job',
	builder: yargs => {
		yargs.options({
			'execution': {
				default: undefined,
				type: 'boolean',
				group: 'History'
			},
			'last': {
				default: undefined,
				type: 'boolean',
				group: 'History'
			},
			'csv': {
				default: 'undefined',
				desc: 'Output results as CSV',
				type: 'boolean',
				group: 'History'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let result;
			let modifier;
			
			if (argv.current) {
				modifier = 'current'
			} else if (argv.last) {
				modifier = 'last';
			}
			
			if (argv.id === 'all') {
				modifier = undefined;
			}
 			
			if (argv.csv) {
				if (modifier) {
					result = await client.jobs.getHistoryCsv(argv.id, modifier, {include: ['all']});
				} else {
					result = await client.jobs.getHistoryCsvList(argv.id, {fields: ['all']});
				}
				output.writeCsv(result);				
			} else {
				if (modifier) {
					result = await client.jobs.getHistory(argv.id, modifier, {include: ['all']});
				} else {
					result = await client.jobs.getHistoryList(argv.id, {fields: ['all']});
				}
				output.writeItem(result, historyOutputFormat);
			}
		});
	}
}
