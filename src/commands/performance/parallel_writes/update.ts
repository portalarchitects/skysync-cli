import { runCommand } from '../../../util/command';
import { writeConfiguration } from './util';
import { Performance } from './../../../sdk';

export = {
	command: 'update',
	description: 'Display current performance configuration',
	builder: yargs => {
		yargs.options({
			'requested': {
				alias: 'r',
				desc: 'Requested number of web service requests that will operate in parallel.',
				type: 'number'
			},
			'max': {
				alias: 'm',
				desc: 'Maximum number of web service requests that will operate in parallel.',
				type: 'number'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const performance: Performance = { 
				parallel_writes: {
					requested: argv.requested,
					max: argv.max
				} 
			};
			writeConfiguration(await client.performance.post(performance), output);
		});
	}
};
