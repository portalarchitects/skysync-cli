import { runCommand } from '../../util/command';
import { listArgumentsDefault } from '../util';
import { util } from '../../sdk';

const outputFormat = {
	table: [
		{
			header: 'Name',
			property: 'name'
		},
		{
			header: 'Size',
			property: 'bytes',
			transform: val => {
				if (typeof(val) === 'undefined') {
					return '';
				}
				return val && util.formatBytes(val);
			}
		},
	],
	json: [
		'id',
		'item_type',
		'etag',
		'hash',
		'owner',
		'content_created_on',
		'created_on',
		'created_by',
		'content_modified_on',
		'modified_on',
		'modified_by'
	]
};

export = {
	command: 'items <connection>',
	desc: 'Traverse connection items',
	builder: yargs => yargs.options({
		...listArgumentsDefault,
		parent: {
			desc: 'Parent ID',
			type: 'string',
			group: 'Search'
		},
		path: {
			desc: 'Parent Path',
			type: 'string',
			group: 'Search'
		}
	}),
	handler: argv => {
		runCommand(argv, async (client, output) => {
			const params = {
				q: argv.search,
				offset: argv.offset,
				limit: argv.limit,
				id: argv.parent,
				path: argv.path
			};

			const items = await client.connectionItems.list(argv.connection, params);
			output.writeTable(items, outputFormat);
		});
	}
}
