import { runCommand } from '../../util/command';
import { detailedOutputFormat } from './util';

export = {
	command: 'show <id>',
	desc: 'Show profile',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const profile = await client.profiles.get(argv.id, {
				fields: [
					'all'
				]
			});
			output.writeItem(profile, detailedOutputFormat);
		});
	}
}
