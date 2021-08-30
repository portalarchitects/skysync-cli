export = {
    command: 'performance',
    desc: 'Manage SkySync performance configuration',
    builder: yargs => yargs.commandDir('./performance').demandCommand(1)
};