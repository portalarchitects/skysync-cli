import { runCommand } from '../../util/command';
import { outputFormat } from './util';
const open = require('open')

export = {
	command: 'add',
	desc: 'Add new user',
	builder: yargs => {
		yargs.options({
			'new-user-username': {
				desc: 'The username for the new user',
				type: 'string',
				demand: true
			},

			'new-user-display-name': {
				desc: 'The display name for the new user',
				type: 'string'
			},

			'new-user-password': {
				desc: 'The password for the new user',
				type: 'string',
				demand: true
			},

			'new-user-group': {
				desc: 'The ID of the group to which the new user will belong',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const user = await client.users.add({
				login: argv.newUserUsername,
				name: argv.newUserDisplayName,
				password: argv.newUserPassword,
				group: {
					id: argv.newUserGroup
				}
			});
			output.writeItem(user, outputFormat);
		});
	}
}
