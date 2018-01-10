import {runCommand} from '../../util/command';
import {auditOutputFormat} from './util';

export = {
	command: 'audit [id]',
	desc: 'Show job execution audit',
	builder: yargs => {
		yargs.options({
			'execution': {
				default: undefined,
				description: 'An execution ID',
				type: 'number',
				group: 'Audit'
			},
			'csv': {
				default: undefined,
				desc: 'Output results as CSV',
				type: 'boolean',
				group: 'Audit'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params: any = {
				fields: ['all']
			};
			if (argv.id) {
				params.job = argv.id;
				if (argv.execution) {
					params.execution = argv.execution;
				}
			} else if (argv.execution) {
				output.writeWarning('Execution parameter ignored.', true);
			}

			if (argv.csv) {
				const result = await client.transferAudits.downloadCsv(params);
				output.writeText(result);
			} else {
				const result = await client.transferAudits.list(params);
				output.writeTable(result, auditOutputFormat);
			}
		});
	}
}
