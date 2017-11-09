export = {
	command: 'pool',
	desc: 'Manage SkySync Connections\' Pool',
	builder: yargs => yargs.commandDir('./pool', {
		exclude: /util/
	}).demandCommand(1)
}
