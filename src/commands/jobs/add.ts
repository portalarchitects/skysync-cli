import * as fs from 'fs';
import { runCommand, readJsonInput } from '../../util/command';
import { detailOutputFormat } from './util';
import { JobWizard } from './wizard';

export = {
	command: 'add',
	desc: 'Add job',
	builder: yargs => {
		yargs.options({
			'kind': {
				desc: 'The job kind',
				type: 'string',
				default: 'transfer',
				demand: true
			},

			'name': {
				desc: 'The job name',
				type: 'string'
			},

			'wizard': {
				alias: 'prompt',
				desc: 'A flag to indicate a desire to run through the new-job wizard',
				default: true,
				type: 'boolean'
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
			let job: any = {
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
			job[job.kind] = options;

			if (!options && !argv.optionsInput && job.kind === 'transfer' && argv.wizard) {
				job = await new JobWizard(client).run(job);
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
