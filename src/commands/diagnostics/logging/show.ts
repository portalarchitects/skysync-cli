import { runCommand } from '../../../util/command';
import { writeConfiguration } from './util';

export = {
	command: 'show',
	description: 'Display logging configuration',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			writeConfiguration(await client.diagnosticsLogging.get(), output);
		});
	}
};
