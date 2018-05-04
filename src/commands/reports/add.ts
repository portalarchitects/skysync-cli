import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'add',
	desc: 'Add new report',
	builder: yargs => {
		yargs.options({
			'category': {
				desc: 'Category ID',
				type: 'number'
			},

			'parent': {
				desc: 'Parent Job ID',
				type: 'string'
			},

			'jobs': {
				desc: 'List of Job IDs',
				type: 'array'
			},

			'name': {
				desc: 'Report name',
				type: 'string'
			},

			'description': {
				desc: 'Report description',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const parameters = {
				...argv.category && { job_category_id: argv.category },
				...argv.parent && { parent: argv.parent },
				...argv.jobs && { jobs: argv.jobs },
			};

			const report = await client.reports.add({
				name: argv.name,
				description: argv.description,
				parameters
			});
			output.writeItem(report, outputFormat);
		});
	}
};
