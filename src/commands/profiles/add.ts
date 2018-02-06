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

function getJobTemplatesJson(argv, output) {
	return argv.templates && argv.templates.split(',').map(input => {
		const jobTemplateInputParsed = input.trim().split(':');
		if (jobTemplateInputParsed.length !== 2) {
			output.writeWarning(`The job template input "${input}" does not appear to be in the correct format.  The job template must be specified using the ID and the kind, separated by a colon.`, true);
			return;
		}
		const jobTemplateId = jobTemplateInputParsed[0];
		const jobTemplateKind = jobTemplateInputParsed[1];
		if (!isJobTemplateKindValid(jobTemplateKind)) {
			output.writeWarning(`The job template kind "${jobTemplateKind}" may not be valid.  The template "${jobTemplateId}" may not be properly associated with the profile.`, true);
		}
		return  {
			id: jobTemplateId,
			kind: jobTemplateKind
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
				job_templates: getJobTemplatesJson(argv, output)
			};

			const profile = await client.profiles.add(newProfileRequestBody, { generateclient: true });
			output.writeItem(profile, outputFormat);
		});
	}
}
