export = {
	command: 'groups',
	desc: 'Manage SkySync Groups',
	builder: yargs => yargs.commandDir('./groups', {
		exclude: /util/
	}).demandCommand(1)
};
