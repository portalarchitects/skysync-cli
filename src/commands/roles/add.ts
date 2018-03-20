import { runCommand } from '../../util/command';
import { outputFormat } from './util';

export = {
	command: 'add <name>',
	desc: 'Add new role',
	builder: yargs => {
		yargs.options({
			'permissions': {
				desc: 'A comma separated list of the IDs of the permissions (not permission categories) that belong to this role',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let newRoleRequestBody = {
				name: argv.name,
				permissions: argv.permissions ? argv.permissions.split(',') : undefined
			};

			const role = await client.roles.add(newRoleRequestBody);
			output.writeItem(role, outputFormat);
		});
	}
};
