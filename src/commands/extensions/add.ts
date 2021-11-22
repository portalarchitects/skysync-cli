import * as fs from 'fs';
import FormData = require('form-data');
import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'add <path>',
	desc: 'Add extension',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const form = new FormData();
			form.append('file', fs.createReadStream(argv.path));

			const extension = await client.extensions.add(form as any);
			output.writeItem(extension, outputFormat);
		});
	}
};
