import {runCommand} from '../../util/command';
import {auditOutputFormat} from './util';

export = {
	command: 'audit [id]',
	desc: 'Show job execution audit',
	builder: yargs => {
		yargs.options({
			'execution': {
				default: undefined,
				description: 'An execution index',
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
			let result;

			if (!argv.id && argv.execution) {
				output.writeWarning('Execution parameter ignored.', true);
				argv.execution = undefined;
			}

			if (argv.csv) {
				if (argv.execution) {
					result = await client.jobs.getAuditCsv(argv.id, argv.execution, {include: ['all']});
				} else {
					result = await client.jobs.getAuditCsvList(argv.id, {include: ['all']});
				}
				output.writeCsv(result);
			} else {
				if (argv.execution) {
					result = await client.jobs.getAudit(argv.id, argv.execution, {include: ['all']});
				} else {
					result = await client.jobs.getAuditList(argv.id, {include: ['all']});
				}
				output.writeItem(result, auditOutputFormat);
			}
		});
	}
}
