import { runCommand } from '../../../util/command';
import { changeStatus, writeStatus } from './util';

export = {
	command: 'enable',
	desc: 'Enable Fiddler',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const status = await changeStatus(client.httpClient, true);
			writeStatus(status, output);
		});
	}
};
