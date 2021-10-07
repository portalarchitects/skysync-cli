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
				type: 'ThrottleOption'
			},
			'download': {
				alias: 'd',
				desc: 'The throttle options for downloads.',
				type: 'ThrottleOption'
			}
		}).check(argv => {
			if (argv.hasOwnProperty('upload') || argv.hasOwnProperty('download')) {
				return true;
			}
			return 'Must include at least one option.';
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const performance: Performance = {};
			if (argv.hasOwnProperty('upload')) {
				performance.upload = argv.upload;
			}
			if (argv.hasOwnProperty('download')) {
				performance.upload = argv.download;
			}

			writeConfiguration(await client.performance.post(performance), output);
		});
	}
};
