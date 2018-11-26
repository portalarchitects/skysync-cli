import * as fs from 'fs';
import { runCommand, readJsonInput } from '../../util/command';
import { detailOutputFormat } from './util';

export = {
	command: 'clone [id]',
	desc: 'Clone job',
	builder: yargs => {
		yargs.options({
			'name': {
				desc: 'The job name',
				type: 'string'
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
				...argv.name && { name: argv.name }
			};
			let jobParametersInput = argv.jobInput ? await readJsonInput() : undefined;
			if (!jobParametersInput) {
				jobParametersInput = argv.jobFile ? JSON.parse(fs.readFileSync(argv.jobFile, 'utf-8')) : {};
			}

			let job = Object.assign(jobParametersInput, jobCliParameters);
			job = await client.jobs.clone(argv.id, job, {
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
