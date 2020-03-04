export = {
	command: 'suggestors',
	desc: 'Manage SkySync Suggestors',
	builder: yargs => yargs.commandDir('./suggestors', {
		exclude: /util/
	}).demandCommand(1)
};
