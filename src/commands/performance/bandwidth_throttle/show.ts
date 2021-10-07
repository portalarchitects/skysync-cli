import { runCommand } from '../../../util/command';
import { writeConfiguration } from './util';

export = {
	command: 'show',
	description: 'Display current bandwidth throttle configuration',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			writeConfiguration(await client.performance.get(), output);
		});
	}
};
