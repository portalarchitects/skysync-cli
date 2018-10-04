import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show',
	desc: 'Show active license',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const license = await client.licensing.get(output.outputJson);
			output.writeItem(license, outputFormat);
		});
	}
};
