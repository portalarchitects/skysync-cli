import * as fs from 'fs';
import { runCommand } from '../../../util/command';
import { writeConfiguration } from './util';
import { Performance } from '../../../sdk';

export = {
	command: 'update',
	description: 'Update bandwidth throttle',
	builder: yargs => {
		yargs.options({
			'upload': {
				alias: 'u',
				desc: 'The throttle options for uploads.',
				type: 'string'
			},
			'upload-file': {
				alias: 'u-file',
				desc: 'The options JSON file',
				type: 'string'
			},
			'download': {
				alias: 'd',
				desc: 'The throttle options for downloads.',
				type: 'string'
			},
			'download-file': {
				alias: 'd-file',
				desc: 'The options JSON file',
				type: 'string'
			}
		}).check(argv => {
			if (argv.hasOwnProperty('upload') || argv.hasOwnProperty('upload-file') || argv.hasOwnProperty('download') || argv.hasOwnProperty('download-file')) {
				return true;
			}
			return 'Must include at least one option.';
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let performance: Performance = {};
			if (argv.hasOwnProperty('upload') || argv.hasOwnProperty('upload-file')) {
				performance.upload = argv.upload ? JSON.parse(argv.upload) : undefined;
				if (!performance.upload && argv.uploadFile) {
					performance.upload = JSON.parse(fs.readFileSync(argv.uploadFile, 'utf-8'));
				}
			}
			if (argv.hasOwnProperty('download') || argv.hasOwnProperty('download-file')) {
				performance.download = argv.download ? JSON.parse(argv.download) : undefined;
				if (!performance.download && argv.downloadFile) {
					performance.download = JSON.parse(fs.readFileSync(argv.downloadFile, 'utf-8'));
				}
			}		
			writeConfiguration(await client.performance.post(performance), output);
		});
	}
};
