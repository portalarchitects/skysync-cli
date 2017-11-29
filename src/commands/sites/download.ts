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
			var http = require('http');
			var fs = require('fs');
			var path = require('path');
			
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
					var fileName = (function (): string {
						var contentDisposition = response.headers['content-disposition'];
						if (!contentDisposition) {
							return undefined;
						}
						var fileNameItem = contentDisposition.split(';').filter(item => item.trim().toLowerCase().startsWith("filename=")).shift();
						if (!fileNameItem) {
							return undefined;
						}
						return fileNameItem.split('=').pop();
					})();

					response.pipe(fs.createWriteStream([argv.targetDirectory, fileName].join(path.sep)));
				});
		});
	}
}
