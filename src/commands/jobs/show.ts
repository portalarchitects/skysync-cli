import { runCommand } from '../../util/command';
import { detailOutputFormat } from './util';

export = {
	command: 'show [id]',
	desc: 'Show job',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const job = await client.jobs.get(argv.id, {
				fields: [
					'name',
					'status',
					'disabled'
				]
			});
			output.writeItem(job, detailOutputFormat);
		});
	}
};
