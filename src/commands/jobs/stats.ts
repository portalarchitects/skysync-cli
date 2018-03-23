require('cliff');
import { util } from '../../sdk';
import {runCommand} from '../../util/command';

const outputFormat = {
	table: [
		{
			header: 'Timestamp',
			property: 'timestamp',
			transform: val => new Intl.DateTimeFormat('en', {month: 'short', day: '2-digit'}).format(val * 1000)
		},
		{
			header: 'Content',
			property: 'stats',
			transform: statTransform('bytes', util.formatBytes)
		},
		{
			header: 'Files',
			property: 'stats',
			transform: statTransform('files')
		},
		{
			header: 'Folders',
			property: 'stats',
			transform: statTransform('folders')
		}
	]
};

function statTransform(statKey: string, format?: (number: number) => string) {
	if (!format) {
		format = num => num.toLocaleString('en');
	}
	return val => {
		let source = 0, destination = 0;
		Object.keys(val).forEach(key => {
			const stat = val[key];
			source += stat.source[statKey];
			destination += stat.destination[statKey];
		});
		return `(${format(source)} ${('\u2191' as any).gray} ${format(destination)} ${('\u2193' as any).gray})`;
	};
}

export = {
	command: 'stats [id]',
	desc: 'Show transfer statistics',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const stats = await client.transferStatistics.get(argv.id);
			if (output.outputJson) {
				output.writeItem(stats);
			} else {
				output.writeItem(stats && stats.timeline, outputFormat);
			}
		});
	}
};
