export = {
	command: 'bandwidth_throttle',
	desc: 'Manage SkySync bandwidth throttle configuration',
	builder: yargs => yargs.commandDir('./bandwidth_throttle', {
		exclude: /util/
	}).demandCommand(1)
};
