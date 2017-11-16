import { runCommand } from '../../util/command';
import { detailOutputFormat, jobsSearchArgumentsDefault, searchCriteriaIsMissing, getSearchArgs } from './util';

export = {
	command: 'pause [id]',
	desc: 'Pause job(s)',
	builder: yargs => {
		yargs.options({
			'all': {
				desc: 'Pause all jobs',
				type: 'boolean',
				group: 'Search',
				default: undefined
			},
			...jobsSearchArgumentsDefault
		})
	},
	handler: argv => {
		if (argv.id === undefined) {
			if (searchCriteriaIsMissing(argv)) {
				console.error("Search criteria must be specified. To pause all jobs, use --all parameter");
			}
			else {
				runCommand(argv, async (client, output) => {
					const result = await client.jobs.pauseMultiple({
						...getSearchArgs(argv)
					});
					const totalCount = result.meta.total_count;
					if (totalCount === undefined || totalCount == 0) {
						output.writeWarning("Warning: 0 jobs were paused because no jobs matched the specified filter");
					}
					else if (totalCount == 1) {
						output.writeSuccess(`1 job paused`);
					}
					else {
						output.writeSuccess(`${totalCount} jobs paused`);
					}
				});
			}
		}
		else {
			runCommand(argv, async (client, output) => {
				const job = await client.jobs.pause(argv.id, {
					fields: [
						'name',
						'status',
						'disabled'
					]
				});
				if (job == null) {
					output.writeFailure(`Job with ID=${argv.id} was not found`)
				}
				else {
					output.writeItem(job, detailOutputFormat);
				}
			});
		}
	}
}
