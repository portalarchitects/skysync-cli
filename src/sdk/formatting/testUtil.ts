import {getDateFormat} from './getDateFormat';

export const getTimeZoneCode = (date: Date): string => {
	const formatter = getDateFormat({hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short'});
	const localizedDate = formatter.format(date);
	const parts = localizedDate.split(' ');
	return parts[parts.length - 1];
};

export const appendTimeZoneCode = (date: string): string => {
	return `${date} ${getTimeZoneCode(new Date(date))}`;
};

const minute = 6e4;

Date.prototype.getTimezoneOffset = function() {
	const formatter = getDateFormat({year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
	const parts = formatter.formatToParts(this);
	const get = (type: string) => parts.find(p => p.type === type).value;
	const utcStr = `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:00Z`;
	return Math.floor(this.getTime() / minute) - Math.floor(new Date(utcStr).getTime() / minute);
};
