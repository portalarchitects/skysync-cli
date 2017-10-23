const credentials = require('./credentials');
const SkySyncClient = require('skysync-cli').SkySyncClient;

const client = new SkySyncClient(credentials);

client.connections.list({q: 'Sample'})
	.then(connections => {
		connections.forEach(function(connection) {
			console.log(`Deleting connection ${connection.name} (${connection.id})`);
			client.connections.delete(connection.id).catch(console.error);
		}, this);
	})
	.catch(console.error);

client.jobs.list({active: true, kind: 'transfer'})
	.then(jobs => {
		jobs.forEach(function(job) {
			if (job.name.startsWith('Sample')) {
				console.log(`Deleting job ${job.name} (${job.id})`);
				client.jobs.delete(job.id).catch(console.error);
			}
		}, this);
	})
	.catch(console.error);
