import {runCommand} from '../../util/command';
import {historyOutputFormat} from './util';

export = {
	command: 'history <id> [current|last]',
	desc: 'Show job history for a specific job',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let result;

			if (argv.current) {
				result = await client.jobs.getHistory(argv.id, argv.current, { include: [ 'all']});
			} else {
				result = await client.jobs.getHistoryList(argv.id, { fields: [ 'all' ]});
			}
			output.writeItem(result, historyOutputFormat);
		});
	}
}
