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
				type: 'string'				
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

			'job-input': {
				alias: 'in',
				desc: 'Read JSON options from stdin',
				type: 'boolean'
			},

			'job-file': {
				alias: 'file',
				desc: 'The options JSON file',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let jobCliParameters: any = {
				...argv.kind && { kind: argv.kind },
				...argv.name && { name: argv.name },
				...argv.manual && { schedule: { mode: 'manual' }}
			};
			
			let jobParametersInput = argv.jobInput ? await readJsonInput() : undefined;
			if (!jobParametersInput && argv.jobFile) {
				jobParametersInput = JSON.parse(fs.readFileSync(argv.jobFile, 'utf-8'));
			}

			let jobDefaults: any = {
				kind: 'transfer',
				schedule: { mode: 'auto' }
			};
			
			let job = Object.assign(jobDefaults, jobParametersInput, jobCliParameters);
			
			if (!jobParametersInput && !argv.jobInput && job.kind === 'transfer' && argv.wizard) {
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
};
