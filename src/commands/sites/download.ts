import { runCommand } from '../../util/command';

export = {
	command: 'download <id>',
	desc: 'Download installation package for a remote site',
	builder: yargs => {
		yargs.options({
			'targetDirectory': {
				desc: 'Directory in which to place the downloaded file',
				type: 'string',
				default: (process.cwd())
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			try {
				let path = await client.sites.download(argv.id, argv.targetDirectory);
				output.writeSuccess(`File saved to ${path}`);
			} catch (err) {
				output.writeFailure(err);
			}
		});
	}
}
