export = {
	command: 'reports',
	desc: 'Manage SkySync Transfer Reports',
	builder: yargs => yargs.commandDir('./reports', {
		exclude: /util/
	}).demandCommand(1)
};
