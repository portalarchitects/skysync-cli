import { DiagnosticLoggingStatus } from '../../../sdk';
import { OutputFormatter } from '../../../util/formatter';

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
