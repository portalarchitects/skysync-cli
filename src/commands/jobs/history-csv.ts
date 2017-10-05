import {runCommand} from '../../util/command';

export = {
	command: 'history-csv [id]',
	desc: 'Show job history in comma-delimited value format',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const result = await client.jobs.getHistoryCsv(argv.id, {
				fields: [
					'all',
				]
			});
			output.writeCsv(result);
		});
	}
}
