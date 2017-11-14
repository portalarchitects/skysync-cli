import { runCommand } from '../../util/command';
import { detailOutputFormat, jobsSearchArgumentsDefault } from './util';

function isSearchCriteriaSpecified(argv):boolean {
	return true;
}

export = {
	command: 'start [id]',
	desc: 'Start job(s)',
	builder: yargs => {
		yargs.options({
			'all': {
				desc: 'Start all jobs',
				type: 'boolean',
				group: 'Search'
			},
			'parent': {
				desc: 'Search by the parent job ID',
				type: 'string',
				group: 'Search'
			},
			...jobsSearchArgumentsDefault
		})
	},
	handler: argv => {
		if (argv.id) {
			runCommand(argv, async (client, output) => {
				const job = await client.jobs.start(argv.id, {
					fields: [
						'name',
						'status',
						'disabled'
					]
				});
				output.writeItem(job, detailOutputFormat);
			});
		} else {
			console.log("got here: " + isSearchCriteriaSpecified(argv))
		}
	}
}
