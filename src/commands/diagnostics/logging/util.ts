import { DiagnosticLoggingStatus } from '../../../sdk';
import { OutputFormatter } from '../../../util/formatter';

export enum LoggingLevel {
	Trace = 'trace',
	Debug = 'debug',
	Info = 'info',
	Warn = 'warn',
	Error = 'error',
	Fatal = 'fatal'
};

export const getLevels = (enumObject: typeof LoggingLevel) : string[] => {
	let levels = [];
	for (let key in enumObject) {
		if ({}.hasOwnProperty.call(enumObject, key)) {
			levels.push(enumObject[key]);
		}
	}
	return levels;
};

const outputFormat = {
	table: [
		{
			header: 'Level',
			property: 'level',
		},
		{
			header: 'Retention Days',
			property: 'retention_days',
		}
	],
	json: [
		'level',
		'retention_days'
	]
};

export const writeConfiguration = (config: DiagnosticLoggingStatus, output: OutputFormatter) => {
	output.writeItem(config, outputFormat);
};
