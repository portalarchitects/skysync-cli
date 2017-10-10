export = {
	command: 'groups',
	desc: 'Manage SkySync Ownership Groups',
	builder: yargs => yargs.commandDir('./groups', {
		exclude: /util/
	}).demandCommand(1)
};
