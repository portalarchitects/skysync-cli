export = {
	command: 'logging',
	desc: 'Configure Logging within SkySync',
	builder: yargs => yargs.commandDir('./logging', {
		exclude: /util/
	}).demandCommand(1)
};
