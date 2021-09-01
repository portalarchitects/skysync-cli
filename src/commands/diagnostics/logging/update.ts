import { runCommand } from '../../../util/command';
import { getLevels, writeConfiguration } from './util';
import { DiagnosticLoggingStatus, LoggingLevel } from './../../../sdk';

export = {
	command: 'update',
	description: 'Update logging configuration',
	builder: yargs => {
		yargs.options({
			'level': {
				alias: 'l',
				desc: 'Set the level of detail for application logs',
				type: 'string',
				choices: getLevels(LoggingLevel)
			},
			'retention': {
				alias: 'r',
				desc: 'Set the log retention duration in days',
				type: 'number'
			}
		}).check(argv => {
			if (argv.hasOwnProperty('level') || argv.hasOwnProperty('retention')) {
				return true;
			}
			return 'Must include at least one option.';
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const logStatus: DiagnosticLoggingStatus = { 
				level: argv.level,
				retention_days: argv.retention
			};

			writeConfiguration(await client.diagnosticsLogging.post(logStatus), output);
		});
	}
};

