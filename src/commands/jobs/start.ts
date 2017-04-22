import { runCommand } from '../../util/command';
import { detailOutputFormat } from './util';

export = {
	command: 'start <id>',
	desc: 'Start job',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const job = await client.jobs.start(argv.id, {
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
