const isInTest = typeof global['it'] === 'function';
const timeZone = isInTest && { timeZone: process.env.TIME_ZONE || 'UTC' };

export const getDateFormat = args => new Intl.DateTimeFormat('en', Object.assign(args, timeZone));
