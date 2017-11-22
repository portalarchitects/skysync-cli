export = {
	command: 'categories',
	desc: 'Manage SkySync Connections',
	builder: yargs => yargs.commandDir('./categories').demandCommand(1)
};
