const isInTest = typeof global['it'] === 'function';

const timeZone = isInTest && { timeZone: 'America/Phoenix' };

export const getDateFormat = args => new Intl.DateTimeFormat('en', Object.assign(args, timeZone));
