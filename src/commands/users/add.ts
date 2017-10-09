import { runCommand } from '../../util/command';
import { outputFormat } from './util';
const open = require('open')

export = {
	command: 'add <new-user-username> <new-user-password>',
	desc: 'Add new user',
	builder: yargs => {
		yargs.options({
			'new-user-email': {
				desc: 'The e-mail address for the new user',
				type: 'string'
			},
			
			'new-user-display-name': {
				desc: 'The display name for the new user',
				type: 'string'
			},

			'new-user-group': {
				desc: 'The ID of the group to which the new user will belong',
				type: 'string'
			},
			
			'new-user-roles': {
				desc: 'A comma separated list of the IDs of the roles to which the new user will belong',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let newUserRequestBody = {
				login: argv.newUserUsername,
				name: argv.newUserDisplayName,
				password: argv.newUserPassword,
				email: argv.newUserEmail,
				group: {
					id: argv.newUserGroup
				},
				roles: []
			};

			if(argv.newUserRoles) {
				let newUserRolesSplit = argv.newUserRoles.split(',');
				let newUserRoles = [];
				newUserRolesSplit.forEach(x => {
					newUserRoles.push({ id: x });
				});
				newUserRequestBody.roles = newUserRoles;
			}
			const user = await client.users.add(newUserRequestBody);
			output.writeItem(user, outputFormat);
		});
	}
}
