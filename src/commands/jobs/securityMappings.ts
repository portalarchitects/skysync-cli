import { listArgumentsDefault } from '../util';
import { runCommand } from '../../util/command';
import { securityMappingOutputFormat } from './util';

export = {
	command: 'security-mappings <id>',
	desc: 'List transfer security mappings',
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
					'resolution',
					'message'
				]
			};
			const mappings = await client.transferSecurityMappings.list(params);
			output.writeTable(mappings, securityMappingOutputFormat);
		});
	}
};
