import { runCommand } from '../util/command';

export = {
	command: 'sessions',
	desc: 'Manage SkySync User Session',
	builder: yargs => {
		yargs.command('token', 'Retrieve an access token for the configured user', _ => {}, argv => {
			runCommand(argv, async (client, output) => {
				const access_token = await client.httpClient.getAccessToken();
				if (output.outputJson) {
					output.writeItem({ access_token }, {
						table: [
							{
								header: 'Access Token',
								property: 'access_token'
							}
						]
					});
				} else {
					output.writeText(access_token);
				}
			});
		});
		yargs.demandCommand(1);
	}
};
