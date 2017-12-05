import { HttpClient } from './http-client';
import * as request from 'request';

export class RequestHttpClient extends HttpClient<any, any> {
	constructor(baseAddress: string, username: string, password: string, site: string = null) {
		super(baseAddress, username, password, site);
		request.defaults({
			headers: {
				'Accept': 'application/json'
			}
		});
	}

	protected executeJsonRequest(req: any, callback: (err: any, response: any, body: string) => void) {
		request(req, callback);
	}
	
	async executeDownloadRequest(options:any, pathResolver:any): Promise<any> {
		/*
		var response2 = await new Promise<any>(async (resolve, reject) => {
			resolve(request.get(options));
		});
		*/
		var response = request.get(options);
		response.on('response', await async function (response) {
				return await new Promise(async (resolve, reject) => {

						if (response.statusCode === 404) {
							return reject('The requested file could not be found3.');
						}
						let outputPath = pathResolver(response);
						//outputPath = 'C:\\S4\\testing.zip';
						console.log(outputPath);
						return await response.pipe(require('fs').createWriteStream(outputPath))
							.on('finish', () => {
								console.log(`statusCode=${response.statusCode}`);
								console.log('requestHttpClient resolving');
								return resolve(outputPath);
							})
							.on('error', () => {
								console.log('requestHttpClient rejecting');
								return reject;
							});
						//console.log('after pipe');
						//return await handler(response);
					}
				)
			}
		);
	}
	
	protected getStatusCode(response: any): number {
		return response.statusCode;
	}
}
