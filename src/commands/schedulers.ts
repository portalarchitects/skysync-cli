export = {
	command: 'schedulers',
	desc: 'Manage SkySync Job Schedulers',
	builder: yargs => yargs.commandDir('./schedulers', {
		exclude: /util/
	}).demandCommand(1)
};
