const credentials = require('./credentials');
const SkySyncClient = require('skysync-cli').SkySyncClient;

const client = new SkySyncClient(credentials);

let nfsConnection;
let o365Connection;

let nfsConnectionPromise = client.connections.add({
	name: 'Sample NFS Connection',
	platform: { id: 'nfs' },
	auth: {
		uri: '\\\\test-server',
		username: 'localhost/admin',
		password: 'secret'
	}
}).then(connection => { nfsConnection = connection });

let o365ConnectionPromise = client.connections.add({
	name: 'Sample Office 365 Connection',
	platform: { id: 'office365' },
	auth: {
		uri: 'https://yourserver.sharepoint.com/',
		username: 'admin@yourserver.onmicrosoft.com',
		password: 'secret'
	}
}).then(connection => { o365Connection = connection });

Promise.all([nfsConnectionPromise, o365ConnectionPromise])
	.then(() => {
		console.log(`Creating job with connections ${nfsConnection.id} -> ${o365Connection.id}`);
		client.jobs.add({
			name: 'Sample job',
			kind: 'transfer',
			transfer: {
				transfer_type: 'sync',
				source: {
					connection: nfsConnection,
					target: {
						path: '/test/Source'
					}
				},
				destination: {
					connection: o365Connection,
					target: {
						path: '/test/Destination'
					}
				}
			},
			schedule: {
				mode: 'manual'
			}
		}).then(job => {
			console.log(`Starting job ${job.id}`);
			client.jobs.start(job);
		});
	})
	.catch(error => {
		console.error('Error while creating connections:');
		console.error(error);
	});
