export = {
	command: 'roles',
	desc: 'Manage SkySync Roles',
	builder: yargs => yargs.commandDir('./roles', {
		exclude: /util/
	}).demandCommand(1)
};
