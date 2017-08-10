export = {
	command: 'sites',
	desc: 'Manage SkySync Remote Sites',
	builder: yargs => yargs.commandDir('./sites', {
		exclude: /util/
	}).demandCommand(1)
};
