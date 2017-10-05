import {runCommand} from '../../util/command';

export = {
	command: 'history-csv',
	desc: 'Show job history for all jobs in comma-delimited value (CSV) format',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			console.log('history-csv');
			const result = await client.jobs.getHistoryCsvList(null, { fields: [ 'all' ]});
			output.writeCsv(result);
		});
	}
}
