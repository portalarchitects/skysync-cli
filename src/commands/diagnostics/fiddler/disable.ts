import { runCommand } from '../../../util/command';
import { changeStatus, writeStatus } from './util';

export = {
	command: 'disable',
	desc: 'Disable Fiddler',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const status = await changeStatus(client.httpClient, false);
			writeStatus(status, output);
		});
	}
};
