export = {
	command: 'permissions',
	desc: 'View SkySync Permissions',
	builder: yargs => yargs.commandDir('./permissions', {
		exclude: /util/
	}).demandCommand(1)
};
