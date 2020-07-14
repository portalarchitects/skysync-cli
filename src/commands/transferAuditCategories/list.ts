import { runCommand } from '../../util/command';
import { listArgumentsDefault } from '../util';
import { outputFormat } from '../auditCategories/util';

export = {
	command: 'list',
	desc: 'List all Transfer Audit Categories',
	builder: yargs => {
		yargs.options({
			...listArgumentsDefault
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const auditCategories = await client.transferAuditCategories.list({
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit,
				fields: 'all'
			});
			output.writeTable(auditCategories, outputFormat);
		});
	}
};
