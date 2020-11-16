require('clifflite');
import {runCommand} from '../../util/command';
import {statsOutputFormat} from './util';

export = {
	command: 'stats <id>',
	desc: 'Show transfer statistics',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const stats = await client.transferStatistics.get(argv.id);
			if (output.outputJson) {
				output.writeItem(stats);
			} else {
				output.writeItem(stats && stats.timeline, statsOutputFormat);
			}
		});
	}
};
