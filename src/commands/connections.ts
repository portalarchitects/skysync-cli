export = {
	command: 'connections',
	desc: 'Manage SkySync Connections',
	builder: yargs => yargs.commandDir('./connections').demandCommand(1)
};
