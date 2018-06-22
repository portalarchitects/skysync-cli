import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show Job Category details',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const jobCategory = await client.jobCategories.get(argv.id);
			output.writeItem(jobCategory, outputFormat);
		});
	}
};
