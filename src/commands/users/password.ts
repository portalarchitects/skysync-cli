export = {
	command: 'password',
	desc: 'Manage SkySync Users\' Passwords',
	builder: yargs => yargs.commandDir('./password', {
		exclude: /util/
	}).demandCommand(1)
};
