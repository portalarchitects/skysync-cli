import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'add <name>',
	desc: 'Add a Job Category',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const jobCategory = await client.jobCategories.add({
				name: argv.name
			});
			output.writeItem(jobCategory, outputFormat);
		});
	}
};
