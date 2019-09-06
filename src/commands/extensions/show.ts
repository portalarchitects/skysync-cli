import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show extension',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const extension = await client.extensions.get(argv.id);
			output.writeItem(extension, outputFormat);
		});
	}
};
