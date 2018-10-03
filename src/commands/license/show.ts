import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show',
	desc: 'Show active license',
	builder: yargs => {
		yargs.options({
			'usage': {
				desc: 'Include license usage',
				type: 'boolean'
			},
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const license = await client.licensing.get(argv.usage && output.outputJson);
			output.writeItem(license, outputFormat);
			if (argv.usage && !output.outputJson) {
				output.writeWarning('Requested license usage is only displayed when outputting JSON.', true);
			}
		});
	}
};
