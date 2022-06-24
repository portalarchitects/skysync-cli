import * as fs from 'fs';
import * as process from 'process';
import * as yargs from 'yargs';

const Liftoff = require('liftoff');
const mypackage = require('../package');

// Set env var for ORIGINAL cwd
// before anything touches it
process.env.INIT_CWD = process.cwd();

const cli = new Liftoff({
	name: mypackage.name,
	configName: mypackage.name,
	extensions: {
		'.json': null
	},
	v8flags: require('v8flags')
});

export function run() {
	cli.prepare({}, function (env) {
        	cli.execute(env, function (env) { 
			const configPath = env.configPath;
			if (configPath) {
				yargs.config(JSON.parse(fs.readFileSync(configPath, 'utf-8')));
			}

			return yargs
				.env('SKYSYNC')
				.config()
				.version(mypackage.version)
				.help()
				.usage('Usage: ' + cli.name + ' [command]')
				.options({
					'output-json': {
						alias: 'json',
						desc: 'Output results as JSON',
						type: 'boolean',
						global: true,
						group: 'Advanced'
					},

					'server': {
						desc: 'The SkySync server URI',
						type: 'string',
						global: true,
						group: 'Connection'
					},

					'username': {
						alias: 'user',
						desc: 'The username',
						default: 'admin',
						type: 'string',
						global: true,
						group: 'Connection'
					},

					'password': {
						type: 'string',
						desc: 'The password',
						global: true,
						group: 'Connection'
					},

					'site': {
						type: 'string',
						desc: 'The remote site context',
						global: true,
						group: 'Connection'
					}
				})
				.commandDir('./commands')
				.group([
					'config',
					'help',
					'version',
				], 'Advanced')
				.global([
					'Advanced',
					'Connection'
				])
				.demandCommand(1, 'You must provide a command')
				// .strict()
				.argv;
		});
	});
}
