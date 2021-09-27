import { Performance } from '../../../sdk';
import { OutputFormatter } from '../../../util/formatter';

const outputFormat = {
	table: [
		{
			header: 'Concurrent Transfers',
			property: 'concurrent_transfers',
		},
		{
			header: 'Maximum Concurrent Transfers',
			property: 'max_concurrent_transfers',
		}
	],
	json: [
		'concurrent_transfers',
		'max_concurrent_transfers'
	]
};

export const writeConfiguration = (config: Performance, output: OutputFormatter) => {
	output.writeItem(config, outputFormat);
};
