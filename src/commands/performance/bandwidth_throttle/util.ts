import { Performance, DataFormatter } from '../../../sdk';
import { OutputFormatter } from '../../../util/formatter';

const outputFormat = {
	table: [
		{
			header: 'Upload Byte Per Second',
			property: 'upload.bytes_per_second',
		},
		{
			header: 'Upload Windows',
			property: 'upload.window',
			transform: val => windowTransform(val)
		},
		{
			header: 'Download Byte Per Second',
			property: 'download.bytes_per_second',
		},
		{
			header: 'Download Windows',
			property: 'download.window',
			transform: val => windowTransform(val)
		}
	],
	json: [
		'upload',
		'download'
	]
};

export const windowTransform = (val: any) => {
	if(!val){
		return null;
	}
	return Object.keys(val).map(name => {
		const window = val[name];
		return `[${window.bytes_per_second} [${window.days}] ${DataFormatter.formatTime(window.start_time)} ${DataFormatter.formatTime(window.end_time)}] ` ;
	});
};

export const writeConfiguration = (config: Performance, output: OutputFormatter) => {
	output.writeItem(config, outputFormat);
};
