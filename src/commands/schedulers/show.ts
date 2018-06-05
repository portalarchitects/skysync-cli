import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show job scheduler',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const jobScheduler = await client.jobSchedulers.get(argv.id, {
				fields: 'all'
			});
			output.writeItem(jobScheduler, outputFormat);
		});
	}
};
