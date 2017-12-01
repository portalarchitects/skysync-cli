import { IHttpClient } from '../sdk/http';
import { IDownloadFileProvider } from '../sdk/resources';

const path = require('path');
const fs = require('fs');

export class FileDownloader {
	constructor(private httpClient: IHttpClient, private fileProvider: IDownloadFileProvider) {}

	createDirectory(targetDirectory: string) {
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
	
	download(id: string, outputDirectory: string): Promise<string> {
		return new Promise<any>(async (resolve, reject) => {
			try {
				let _this = this;

				this.createDirectory(outputDirectory);
				let requestPath = this.fileProvider.getDownloadRequestPath(id);
				let response = await this.httpClient.getResponse(requestPath);

				await response.on('response', async function (response) {
					if (response.statusCode === 404) {
						return reject(`Site with ID=${id} not found`);
					}
					let fileName = _this.parseFileName(response);
					if (!fileName) {
						return reject('Server did not return a file');
					}
					const outputPath = path.join(outputDirectory, fileName);
					await response.pipe(fs.createWriteStream(outputPath))
						.on('finish', () => {
							resolve(outputPath)
						})
						.on('error', (err) => {
							reject(err)
						});
				});
			} catch (e) {
				reject(e.message);
			}
		});
	}

	parseFileName(response: any): string {
		let contentDisposition = response.headers['content-disposition'];
		if (!contentDisposition) {
			return undefined;
		}
		let fileNameItem = contentDisposition.split(';').filter(item => item.trim().toLowerCase().startsWith('filename=')).shift();
		if (!fileNameItem) {
			return undefined;
		}
		return fileNameItem.split('=').pop();
	}
}
