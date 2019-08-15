import { runCommand } from '../../../util/command';
import { uninstallCerts, writeStatus } from './util';

export = {
	command: 'uninstall-certs',
	desc: 'Uninstall Fiddler root certificates',
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
			const status = await uninstallCerts(client.httpClient, argv.trustRoot);
			writeStatus(status, output);
		});
	}
};
