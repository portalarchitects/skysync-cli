export = {
	command: 'diagnostics',
	desc: 'View SkySync Diagnostics',
	builder: yargs => yargs.commandDir('./diagnostics').demandCommand(1)
};
