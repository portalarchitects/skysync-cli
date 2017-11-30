import { runCommand } from '../../util/command';

export = {
	command: 'download <id>',
	desc: 'Download installation package for a remote site',
	builder: yargs => {
		yargs.options({
			'targetDirectory': {
				desc: 'Directory in which to place the downloaded file',
				type: 'string',
				default: 'RemoteSiteFiles'
			}
		})
	},
	handler: argv => {
		runCommand(argv, async (client, output) => {
			let http = require('http');
			let fs = require('fs');
			let path = require('path');

			argv.targetDirectory.split(/[\\/]/).reduce((parentDirectory, childDirectory) => {
				const pathSegment = path.resolve(parentDirectory, childDirectory);
				try {
					fs.mkdirSync(pathSegment);
				} catch (err) {
					if (err.code !== 'EEXIST') {
						throw err;
					}
				}
				return pathSegment;
			}, path.isAbsolute(argv.targetDirectory) ? path.sep : '');

			(await client.sites.getFile(argv.id))
				.on('response', function (response) {
					try {
						if (response.statusCode !== 200) {
							throw `Request received response status ${response.statusCode}`
						}
						let fileName = (function (): string {
							let contentDisposition = response.headers['content-disposition'];
							if (!contentDisposition) {
								return undefined;
							}
							let fileNameItem = contentDisposition.split(';').filter(item => item.trim().toLowerCase().startsWith('filename=')).shift();
							if (!fileNameItem) {
								return undefined;
							}
							return fileNameItem.split('=').pop();
						})();

						response.pipe(fs.createWriteStream([argv.targetDirectory, fileName].join(path.sep)))
							.on('finish', function () {
								output.writeSuccess(`File ${fileName} was saved to ${argv.targetDirectory} directory`)
							});
					} catch (err) {
						output.writeFailure(err);
					}
				});
		});
	}
}
