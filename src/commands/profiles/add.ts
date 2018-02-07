import { runCommand } from '../../util/command';
import { outputFormat } from './util';
const open = require('open')

const jobTemplateKinds = [
	'folder_mapping',
	'personal_drive',
	'transfer',
]

function isJobTemplateKindValid(jobTemplateKind) {
	if (jobTemplateKinds.indexOf(jobTemplateKind) > -1) {
		return true
	}
	return false;
}

function getJobTemplatesJson(argv) {
	return argv.templates && argv.templates.split(',').map(input => {
		const jobTemplateKindDefault = 'transfer';
		const [jobTemplateId, jobTemplateKind = jobTemplateKindDefault] = input.split(':');
		return  {
			id: jobTemplateId,
			kind: isJobTemplateKindValid(jobTemplateKind) ? jobTemplateKind : jobTemplateKindDefault 
		}
	}).filter(x => x != null) || [];
}

export = {
	command: 'add <name>',
	desc: 'Add new profile',
	builder: yargs => {
		yargs.options({
			'description' : {
				desc: 'Profile description.',
				type: 'string'
			},
			'instructions': {
				desc: 'Profile instructions',
				type: 'string'	
			} ,
			'templates': {
				desc: 'A comma separated list of the job templates to associate to this new profile.  Both the ID and kind of the job template must be specified (ie. 123456:transfer).',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const newProfileRequestBody = {
				name: argv.name,
				description: argv.description,
				instructions: argv.instructions,
				job_templates: getJobTemplatesJson(argv)
			};

			const profile = await client.profiles.add(newProfileRequestBody, { generateclient: true });
			output.writeItem(profile, outputFormat);
		});
	}
}
