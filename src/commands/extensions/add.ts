import * as fs from 'fs';
import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'add <path>',
	desc: 'Add extension',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			fs.readFile(argv.path, async (err, data) => {
				if (err) {
					output.writeFailure(<any>err, true);
				} else {
					const extension = await client.extensions.add(data);
					output.writeItem(extension, outputFormat);
				}
			});
		});
	}
};
