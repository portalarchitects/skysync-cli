export = {
	command: 'license',
	desc: 'Manage SkySync License',
	builder: yargs => yargs.commandDir('./license').demandCommand(1)
};
