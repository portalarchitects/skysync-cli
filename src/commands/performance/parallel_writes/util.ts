import { Performance } from '../../../sdk';
import { OutputFormatter } from '../../../util/formatter';

const outputFormat = {
	table: [
		{
			header: 'Requested Parallel Writes',
			property: 'parallel_writes.requested',
		},
		{
			header: 'Maximum Parallel Writes',
			property: 'parallel_writes.max',
		}
	],
	json: [
		'parallel_writes.requested',
		'parallel_writes.max'
	]
};

export const writeConfiguration = (config: Performance, output: OutputFormatter) => {
	output.writeItem(config, outputFormat);
};
