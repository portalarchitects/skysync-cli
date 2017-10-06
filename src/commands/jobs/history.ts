import {runCommand} from '../../util/command';
import {historyOutputFormat} from './util';

export = {
	command: 'history <id>',
	desc: 'Show history for a specific job',
	builder: yargs => {
		yargs.options({
			'current': {
				default: undefined,
				type: 'boolean'
			},
			'last': {
				default: undefined,
				type: 'boolean'
			},
			'format': {
				default: 'json',
				desc: 'output format',
				type: 'string'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let result;

			if (argv.current) {
				result = await client.jobs.getHistory(argv.id, 'current', { include: [ 'all']});
			} else if (argv.last) {
				result = await client.jobs.getHistory(argv.id, 'last',{ fields: [ 'all' ]});
			} else {
				result = await client.jobs.getHistoryList(argv.id, { fields: [ 'all' ]});
			}
			output.writeItem(result, historyOutputFormat);
		});
	}
}
