export = {
	command: 'parallel_writes',
	desc: 'Manage SkySync parallel writes configuration',
	builder: yargs => yargs.commandDir('./parallel_writes', {
		exclude: /util/
	}).demandCommand(1)
};
