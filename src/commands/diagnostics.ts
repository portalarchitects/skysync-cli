export = {
	command: 'diagnostics',
	desc: 'Manage SkySync Diagnostics',
	builder: yargs => yargs.commandDir('./diagnostics').demandCommand(1)
};
