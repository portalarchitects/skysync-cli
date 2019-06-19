export = {
	command: 'fiddler',
	desc: 'Configure Fiddler within SkySync',
	builder: yargs => yargs.commandDir('./fiddler').demandCommand(1)
};
