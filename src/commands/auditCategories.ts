export = {
	command: 'audit-categories',
	desc: 'Manage Audit Categories',
	builder: yargs => yargs.commandDir('./auditCategories').demandCommand(1)
};
