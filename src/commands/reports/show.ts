import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show report details',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const report = await client.reports.get(argv.id);
			output.writeItem(report, outputFormat);
		});
	}
};
