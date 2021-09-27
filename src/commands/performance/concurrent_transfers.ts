export = {
	command: 'concurrent_transfers',
	desc: 'Manage SkySync concurrent transfers configuration',
	builder: yargs => yargs.commandDir('./concurrent_transfers', {
		exclude: /util/
	}).demandCommand(1)
};