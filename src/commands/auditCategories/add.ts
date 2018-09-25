import { runCommand, readJsonInput } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'add',
	desc: 'Add an Audit Category',
	builder: yargs => {
		yargs.options({
			'name': {
				desc: 'Audit Category name',
				type: 'string',
				demandOption: true,
			},
			
			'description': {
				desc: 'Audit Category description',
				type: 'string',
			},

			'action': {
				desc: 'Action',
				type: 'string',
			},
			
			'level': {
				desc: 'Log level',
				type: 'string',
			},
			
			'priority': {
				desc: 'Priority',
				type: 'number',
			},

			'options-input': {
				alias: 'in',
				desc: 'Read JSON options from stdin',
				type: 'boolean'
			},

			'auditType': {
				alias: 'type',
				desc: 'Audit Type code to which this audit category applies',
				type: 'number'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let auditCategory: any = {
				name: argv.name,
				description: argv.description,
				action: argv.action,
				level: argv.level,
				priority: argv.priority,
				filter: {
					rules: [{
						filter: {
							name: 'audit_type',
							select: null,
							op: 'eq',
							value: argv.auditType
						},
						type: 'filter_context'
					}]
				}
			};

			if (argv.optionsInput) {
				auditCategory = await readJsonInput();
			}
			auditCategory = await client.auditCategories.add(auditCategory, {
				fields: 'all'
			});
			output.writeItem(auditCategory, outputFormat);
		});
	}
};
