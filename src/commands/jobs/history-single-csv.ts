import {runCommand} from '../../util/command';

export = {
	command: 'history-csv <id> [current|last]',
	desc: 'Show job history for a specific job in comma-delimited (CSV) value format',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let result;
			console.log('history-single-csv');

			if (argv.current) {
				result = await client.jobs.getHistoryCsv(argv.id, argv.current, { include: [ 'all']});
			} else {
				result = await client.jobs.getHistoryCsvList(argv.id, { fields: [ 'all' ]});
			}
			output.writeCsv(result);
		});
	}
}
