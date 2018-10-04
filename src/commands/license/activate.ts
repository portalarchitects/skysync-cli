import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'activate <key>',
	desc: 'Activate license',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const license = await client.licensing.activate(argv.key, output.outputJson);
			output.writeItem(license, outputFormat);
		});
	}
};
