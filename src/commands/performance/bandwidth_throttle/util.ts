import { Performance } from '../../../sdk';
import { OutputFormatter } from '../../../util/formatter';

const outputFormat = {
	table: [
		{
			header: 'Upload Throttle',
			property: 'upload',
		},
		{
			header: 'Download Throttle',
			property: 'download',
		}
	],
	json: [
		'upload',
		'download'
	]
};

export const writeConfiguration = (config: Performance, output: OutputFormatter) => {
	output.writeItem(config, outputFormat);
};
