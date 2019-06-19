import { runCommand } from '../../../util/command';
import { getStatus, writeStatus } from './util';

export = {
	command: 'status',
	desc: 'Display Fiddler status',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const status = await getStatus(client.httpClient);
			writeStatus(status, output);
		});
	}
};
