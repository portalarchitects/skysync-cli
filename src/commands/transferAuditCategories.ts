export = {
	command: 'transfer-audit-categories',
	desc: 'Manage Transfer Audit Categories',
	builder: yargs => yargs.commandDir('./transferAuditCategories').demandCommand(1)
};
