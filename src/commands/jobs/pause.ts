import { runCommand } from '../../util/command';
import { detailOutputFormat } from './util';

export = {
	command: 'pause <id>',
	desc: 'Pause job',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const job = await client.jobs.pause(argv.id, {
				fields: [
					'name',
					'status',
					'disabled'
				]
			});
			output.writeItem(job, detailOutputFormat);
		});
	}
}
