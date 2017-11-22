import * as fs from 'fs';
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
				desc: 'Audit Type code to which this category applies',
				type: 'number'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let category: any = {
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
				category = await readJsonInput();
			}
			category = await client.categories.add(category, {
				fields: 'all'
			});
			output.writeItem(category, outputFormat);
		});
	}
}
