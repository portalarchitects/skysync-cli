import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'refresh',
	desc: 'Refresh active license',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const license = await client.licensing.refresh(output.outputJson);
			output.writeItem(license, outputFormat);
		});
	}
};
