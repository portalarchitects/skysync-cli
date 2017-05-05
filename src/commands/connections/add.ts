import * as fs from 'fs';
import { runCommand, readJsonInput } from '../../util/command';
const open = require('open')

const outputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'Name',
			property: 'name'
		},
		{
			header: 'Platform',
			property: 'platform.name'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => !val
		}
	],
	json: [
		'platform.id'
	]
};

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
			},

			'auth-input': {
				alias: 'in',
				desc: 'Read authentication JSON from stdin',
				type: 'boolean'
			},

			'auth-file': {
				alias: 'file',
				desc: 'The authentication JSON file',
				type: 'string'
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let authJson = argv.authInput ? await readJsonInput() : undefined;
			if (!authJson && argv.authFile) {
				authJson = JSON.parse(fs.readFileSync(argv.authFile, 'utf-8'));
			}

			if (authJson) {
				const connection: any = {
					name: argv.name,
					platform: {
						id: argv.platform
					},
					auth: authJson
				};

				const result = await client.connections.add(connection);
				output.writeItem(result, outputFormat);
				return;
			}

			const request = await client.connections.authorize(argv.platform, {
				name: argv.name
			});
			output.writeSuccess(`Create the connection using your browser: ${request.target}`, true);
			open(request.target);
		});
	}
}
