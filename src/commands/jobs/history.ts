import { runCommand } from '../../util/command';
import { historyOutputFormat } from './util';

export = {
	command: 'history [id] [csv]',
	desc: 'Show job history',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let result;
			if (argv.csv) {
				result = await client.jobs.getHistoryCsv(argv.id, {
					fields: [
						'all',
					]
				});
				output.writeCsv(result);
			} else {
				result = await client.jobs.getHistory(argv.id, {
					fields: [
						'all',
					]
				});
				output.writeItem(result, historyOutputFormat);
			}
		});
	}
}
