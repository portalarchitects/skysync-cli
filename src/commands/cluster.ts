export = {
	command: 'cluster',
	desc: 'Manage SkySync Cluster',
	builder: yargs => yargs.commandDir('./cluster').demandCommand(1)
};
