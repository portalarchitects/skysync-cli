export = {
	command: 'templates',
	desc: 'Manage SkySync Job Templates',
	builder: yargs => yargs.commandDir('./templates', {
		exclude: /util/
	}).demandCommand(1)
};
