export = {
	command: 'job-categories',
	desc: 'Manage Job Categories',
	builder: yargs => yargs.commandDir('./jobCategories').demandCommand(1)
};
