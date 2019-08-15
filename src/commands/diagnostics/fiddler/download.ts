import { runCommand } from '../../../util/command';
import { downloadTraces } from './util';

export = {
	command: 'download',
	desc: 'Download Fiddler traces from node',
	builder: yargs => {
		yargs.options({
			'targetDirectory': {
				desc: 'Directory in which to place the downloaded file',
				type: 'string',
				default: (process.cwd())
			}
		});
		yargs.options({
			'purge': {
				desc: 'Delete traces after they are downloaded',
				type: 'boolean'
			},
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			try {
				const path = await downloadTraces(client.httpClient, argv.targetDirectory, argv.purge);
				output.writeSuccess(`File saved to ${path}`);
			} catch (err) {
				output.writeFailure(err);
			}
		});
	}
};
