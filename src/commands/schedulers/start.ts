import { runCommand } from '../../util/command';
import { formatTotalCount } from '../util';
import { outputFormat, schedulersSearchArgumentsDefault, getSearchArgs, searchCriteriaIsMissing } from './util';

export = {
	command: 'start [id]',
	desc: 'Start job scheduler(s)',
	builder: yargs => {
		yargs.options({
			'all': {
				desc: 'Start all job schedulers',
				type: 'boolean',
				group: 'Search',
				default: undefined
			},
			...schedulersSearchArgumentsDefault
		});
	},
	handler: argv => {
		if (argv.id === undefined) {
			if (searchCriteriaIsMissing(argv)) {
				console.error(('Search criteria must be specified. To start all job schedulers, use --all parameter' as any).red);
			} else {
				runCommand(argv, async (client, output) => {
					const result = await client.jobSchedulers.startMultiple({
						...getSearchArgs(argv)
					});
					const totalCount = result.meta.total_count;
					if (argv.json) {
						output.writeItem(formatTotalCount(totalCount));
					} else if (totalCount === undefined || totalCount === 0) {
						output.writeWarning('Warning: 0 job schedulers were started because no job schedulers matched the specified filter');
					} else {
						output.writeSuccess(`${totalCount} job scheduler(s) started`);
					}
				});
			}
		} else {
			runCommand(argv, async (client, output) => {
				const jobScheduler = await client.jobSchedulers.start(argv.id, {
					fields: 'all'
				});
				if (jobScheduler == null) {
					output.writeFailure(`Job scheduler with ID=${argv.id} was not found`);
				} else {
					output.writeItem(jobScheduler, outputFormat);
				}
			});
		}
	}
};
