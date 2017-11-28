import { runCommand } from '../../util/command';
import { outputFormat } from './util'

export = {
	command: 'show <id>',
	desc: 'Show Audit Category details',
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const auditCategory = await client.auditCategories.get(argv.id, {fields: 'all'});
			outputFormat.table.push({
				header: 'Description',
				property: 'description'
			});
			output.writeItem(auditCategory, outputFormat);
		});
	}
}
