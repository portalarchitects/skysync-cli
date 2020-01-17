import { IDownloadFileProvider, IHttpClient } from '../sdk';

const path = require('path');
const fs = require('fs');

export class FileDownloader {
	constructor(private httpClient: IHttpClient, private fileProvider: IDownloadFileProvider) {
	}

	download(id: string, outputDirectory: string): Promise<string> {
		return new Promise<any>(async (resolve, reject) => {
			try {
				this.createDirectory(outputDirectory);
				let requestPath = this.fileProvider.getDownloadRequestPath(id);

				return this.httpClient.download(requestPath, async (fileName, response) => {
					if (!fileName) {
						return reject('The server did not return a file.');
					}
					const outputPath = path.join(outputDirectory, fileName);
					return await response.pipe(fs.createWriteStream(outputPath))
						.on('finish', () => {
							resolve(outputPath);
						})
						.on('error', reject);
				});
			} catch (e) {
				reject(e.message);
			}
		});
	}

	private createDirectory(targetDirectory: string) {
		targetDirectory.split(/[\\/]/).reduce((parentDirectory, childDirectory) => {
			const pathSegment = path.resolve(parentDirectory, childDirectory);
			try {
				if (!fs.existsSync(pathSegment)) {
					fs.mkdirSync(pathSegment);
				}
			} catch (err) {
				if (err.code !== 'EEXIST') {
					throw err;
				}
			}
			return pathSegment;
		}, path.isAbsolute(targetDirectory) ? path.sep : '');
	}
}
