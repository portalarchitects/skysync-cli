require('cliff');
import { runCommand } from '../../util/command';
import { statsOutputFormat } from '../jobs/util';

export = {
	command: 'stats [id]',
	desc: 'Show transfer statistics',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const stats = await client.reports.stats(argv.id);
			if (output.outputJson) {
				output.writeItem(stats);
			} else {
				output.writeItem(stats && stats.timeline, statsOutputFormat);
			}
		});
	}
};
