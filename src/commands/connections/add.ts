import { runCommand } from '../../util/command';
const open = require('open')

export = {
	command: 'add',
	desc: 'Add new connection',
	builder: yargs => {
		yargs.options({
			'platform': {
				alias: 'p',
				desc: 'Storage platform',
				type: 'string',
				demand: true
			},

			'name': {
				desc: 'Connection name',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const request = await client.connections.authorize(argv.platform, {
				name: argv.name
			});
			output.writeSuccess(`Create the connection using your browser: ${request.target}`, true);
			open(request.target);
		});
	}
}
