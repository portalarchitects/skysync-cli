export = {
	command: 'extractors',
	desc: 'Manage SkySync Extractors',
	builder: yargs => yargs.commandDir('./extractors', {
		exclude: /util/
	}).demandCommand(1)
};
