export = {
	command: 'sites',
	desc: 'Manage SkySync Remote Sites',
	builder: yargs => yargs.commandDir('./sites').demandCommand(1)
};
