const fs = require('fs');
const path = require('path');
const credentials = require('./credentials');
const SkySyncClient = require('skysync-cli').SkySyncClient;

const client = new SkySyncClient(credentials);

let nfsConnection, o365Connection, template, profile;

async function addConnections() {
	nfsConnection = await client.connections.add({
		name: 'Sample NFS Connection',
		platform: { id: 'nfs' },
		disabled: true
	});

	o365Connection = await client.connections.add({
		name: 'Sample Office 365 Connection',
		platform: { id: 'office365' },
		disabled: true,
		auth: {
			uri: 'https://yourserver.sharepoint.com/'
		}
	})
}

async function addTemplate() {
	console.log(`Creating template with connections ${nfsConnection.id} -> ${o365Connection.id}`);
	const templateResponse = await client.httpClient.post('templates', {
		name: 'Sample job',
		kind: 'transfer',
		transfer: {
			transfer_type: 'sync',
			source: {
				connection: nfsConnection,
				target: {
					path: '/Documents'
				}
			},
			destination: {
				connection: o365Connection,
				target: {
					path: '/Documents'
				}
			}
		},
		schedule: {
			mode: 'manual'
		}
	});
	template = templateResponse['job'];
}

async function addProfile() {
	console.log(`Creating profile for template ${template.id}`);
	const profileResponse = await client.httpClient.post('profiles?generateclient=1', {
		name: 'Sample Profile',
		job_templates: [template]
	});
	profile = profileResponse['profile'];
	console.log(`Created profile ${profile.id}`);
}

async function downloadProfile() {
	console.log(`Downloading agent bundle`);
	const bundlePath = await new Promise(async (resolve, reject) => {
		try {
			await client.httpClient.download(`profiles/${profile.id}/download`, async (fileName, response) => {
				if (!fileName) {
					throw 'The server did not return a file.';
				}

				const outputPath = path.join(process.cwd(), fileName);
				response.pipe(fs.createWriteStream(outputPath))
					.on('finish', () => {
						resolve(outputPath);
					})
					.on('error', e => {
						reject(e);
					});
			});
		} catch (e) {
			return reject(e);
		}
	});

	console.log(`Agent bundle saved to ${bundlePath}`);
}

async function main() {
	await addConnections();
	await addTemplate();
	await addProfile();
	await downloadProfile();
}

main().then(() => console.log('Success'))
	.catch((e) => {
		console.error('Failed to create agent');
		console.error(e);
	});
