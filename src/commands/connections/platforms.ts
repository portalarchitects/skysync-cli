import { runCommand } from '../../util/command';

const outputFormat = {
	table: [
		{
			header: 'ID',
			property: 'id'
		},
		{
			header: 'Name',
			property: 'name'
		},
		{
			header: 'Enabled',
			property: 'disabled',
			transform: val => val ? 'N' : 'Y'
		}
	],
	json: [
		'features'
	]
};

export = {
	command: 'platforms [id]',
	desc: 'List available platforms',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			if (argv.id) {
				const platform = await client.storagePlatforms.get(argv.id);
				return output.writeItem(platform, outputFormat);
			}

			const platforms = await client.storagePlatforms.list();
			output.writeTable(platforms, outputFormat);
		});
	}
};
