export = {
	command: 'users',
	desc: 'Manage SkySync Users',
	builder: yargs => yargs.commandDir('./users', {
		exclude: /util/
	}).demandCommand(1)
};
