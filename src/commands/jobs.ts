export = {
	command: 'jobs',
	desc: 'Manage SkySync Jobs',
	builder: yargs => yargs.commandDir('./jobs', {
		exclude: /util|wizard/
	}).demandCommand(1)
};
