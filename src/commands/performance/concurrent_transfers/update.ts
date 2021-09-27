import { runCommand } from '../../../util/command';
import { writeConfiguration } from './util';
import { Performance } from './../../../sdk';

export = {
	command: 'update',
	description: 'Update concurrent transfers',
	builder: yargs => {
		yargs.options({
			'current': {
				alias: 'c',
				desc: 'Current number of transfers that will operate in parallel.',
				type: 'number'
			},
            'max': {
				alias: 'm',
				desc: 'Maximum number of transfers that will operate in parallel.',
				type: 'number'
			}
		}).check(argv => {
			if (argv.hasOwnProperty('current') || argv.hasOwnProperty('max')) {
				return true;
			}
			return 'Must include at least one option.';
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const performance: Performance = { 
				concurrent_transfers: argv.current,
				max_concurrent_transfers: argv.max
			};

			writeConfiguration(await client.performance.post(performance), output);
		});
	}
};
