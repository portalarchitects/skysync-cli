import {runCommand} from '../../util/command';
import {historyOutputFormat} from './util';

export = {
	command: 'history',
	desc: 'Show job history for all jobs',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const result = await client.jobs.getHistoryList(null, { fields: [ 'all' ]});
			output.writeItem(result, historyOutputFormat);
		});
	}
}
