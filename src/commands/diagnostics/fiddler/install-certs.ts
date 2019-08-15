import { runCommand } from '../../../util/command';
import { installCerts, writeStatus } from './util';

export = {
	command: 'install-certs',
	desc: 'Install Fiddler root certificates',
	builder: yargs => {
		yargs.options({
			'trustRoot': {
				desc: 'Attempt to install root certificates into trusted machine store',
				type: 'boolean'
			},
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const status = await installCerts(client.httpClient, argv.trustRoot);
			writeStatus(status, output);
		});
	}
};
