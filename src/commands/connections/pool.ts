export = {
	command: 'pool',
	desc: 'Manage connection pools',
	builder: yargs => yargs.commandDir('./pool', {
		exclude: /util/
	}).demandCommand(1)
};
