import { runCommand } from '../../../util/command';
import { deleteTraces } from './util';

export = {
	command: 'purge',
	desc: 'Purge Fiddler traces from node',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			try {
				await deleteTraces(client.httpClient);
				output.writeSuccess('Fiddler traces were removed from node.');
			} catch (err) {
				output.writeFailure(err);
			}
		});
	}
};
