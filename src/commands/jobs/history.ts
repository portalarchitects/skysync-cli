import {runCommand} from '../../util/command';
import {historyOutputFormat} from './util';

export = {
	command: 'history [id]',
	desc: 'Show job history',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const result = await client.jobs.getHistory(argv.id, {
				fields: [
					'all',
				]
			});
			output.writeItem(result, historyOutputFormat);
		});
	}
}
