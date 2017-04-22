import * as fs from 'fs';
import { runCommand } from '../../util/command';
import { detailOutputFormat } from './util';

export = {
	command: 'add',
	desc: 'Add job',
	builder: yargs => {
		yargs.options({
			'kind': {
				desc: 'The job kind',
				type: 'string',
				demand: true
			},

			'name': {
				desc: 'The job name',
				type: 'string'
			},

			'auto': {
				desc: 'Schedule the job as automatic',
				type: 'boolean',
				demand: true
			},

			'manual': {
				desc: 'Schedule the job as manual',
				type: 'boolean',
				demand: true
			},

			'options-json': {
				alias: 'options',
				desc: 'The options JSON',
				type: 'string',
				coerce: JSON.parse
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
			let job: any = {
				kind: argv.kind,
				name: argv.name,
				schedule: {
					mode: argv.manual ? 'manual' : 'auto'
				}
			};
			if (argv.optionsJson) {
				job.options = argv.optionsJson;
			} else if (argv.optionsFile) {
				job.options = JSON.parse(fs.readFileSync(argv.optionsFile, 'utf-8'));
			}

			job = await client.jobs.add(job, {
				fields: [
					'name',
					'status',
					'disabled'
				]
			});
			output.writeItem(job, detailOutputFormat);
		});
	}
}
