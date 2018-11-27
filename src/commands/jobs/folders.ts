import { listArgumentsDefault } from '../util';
import { runCommand } from '../../util/command';
import { itemOutputFormat } from './util';


export = {
	command: 'folders <id>',
	desc: 'Show transfer folders',
	builder: yargs => {
		yargs.options({
			...listArgumentsDefault
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params: any = {
				job: argv.id,
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit,
				fields: [
					'source',
					'destination',
					'source_to_destination',
					'audit_category',
					'retried',
					'status',
					'processing',
					'transferred_on'
				]
			};
			const folders = await client.transferFolders.list(params);
			output.writeTable(folders, itemOutputFormat);
		});
	}
};
