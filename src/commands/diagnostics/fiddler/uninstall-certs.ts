import { runCommand } from '../../../util/command';
import { uninstallCerts } from './util';

export = {
	command: 'uninstall-certs',
	desc: 'Uninstall Fiddler root certificates',
	builder: yargs => {
		yargs.options({
			'trustRoot': {
				desc: 'Attempt to uninstall root certificates from trusted machine store',
				type: 'boolean'
			},
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const wasUninstalled = await uninstallCerts(client.httpClient, argv.trustRoot);
			if (wasUninstalled) {
				output.writeSuccess('The certificates were uninstalled.');
			} else {
				output.writeSuccess('The certificates could not be uninstalled.');
			}
		});
	}
};
