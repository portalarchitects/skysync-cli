export = {
	command: 'profiles',
	desc: 'Manage SkySync Profiles',
	builder: yargs => yargs.commandDir('./profiles', {
		exclude: /util/
	}).demandCommand(1)
};
