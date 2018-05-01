import { runCommand } from '../../util/command';
import { FileDownloader } from '../../util/file-downloader';

export = {
	command: 'download',
	desc: 'Download installation package for a cluster node',
	builder: yargs => {
		yargs.options({
			'targetDirectory': {
				desc: 'Directory in which to place the downloaded file',
				type: 'string',
				default: (process.cwd())
			}
		});
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			try {
				const downloader = new FileDownloader(client.httpClient, client.cluster);
				let path = await downloader.download(undefined, argv.targetDirectory);
				output.writeSuccess(`File saved to ${path}`);
			} catch (err) {
				output.writeFailure(err);
			}
		});
	}
};
