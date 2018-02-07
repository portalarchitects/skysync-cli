import * as fs from 'fs';
import { runCommand, readJsonInput } from '../../util/command';
import { detailOutputFormat } from './util';

export = {
	command: 'add',
	desc: 'Add template',
	builder: yargs => {
		yargs.options({
			'kind': {
				desc: 'The job template kind',
				type: 'string',
				default: 'transfer',
				demand: true
			},

			'name': {
				desc: 'The job template name',
				type: 'string'
			},

			'auto': {
				desc: 'Schedule the job as automatic',
				type: 'boolean'
			},

			'manual': {
				desc: 'Schedule the job as manual',
				type: 'boolean'
			},

			'options-input': {
				alias: 'in',
				desc: 'Read JSON options from stdin',
				type: 'boolean'
			},

			'options-file': {
				alias: 'file',
				desc: 'The options JSON file',
				type: 'string'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let template: any = {
				kind: argv.kind,
				name: argv.name,
				schedule: {
					mode: argv.manual ? 'manual' : 'auto'
				}
			};

			let options = argv.optionsInput ? await readJsonInput() : undefined;
			if (!options && argv.optionsFile) {
				options = JSON.parse(fs.readFileSync(argv.optionsFile, 'utf-8'));
			}
			template[template.kind] = options;

			template = await client.templates.add(template, {
				fields: ['id', 'name', 'kind', 'disabled', 'schedule', 'transfer']
			});
			output.writeItem(template, detailOutputFormat);
		});
	}
}
