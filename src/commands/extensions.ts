export = {
	command: 'extensions',
	desc: 'Manage SkySync Extensions',
	builder: yargs => yargs.commandDir('./extensions', {
		exclude: /util/
	}).demandCommand(1)
};
