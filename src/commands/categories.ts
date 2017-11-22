export = {
	command: 'categories',
	desc: 'Manage Audit Categories',
	builder: yargs => yargs.commandDir('./categories').demandCommand(1)
};
