import {getDateFormat} from './getDateFormat';

export const getTimeZoneCode = (date: Date): string => {
	const formatter = getDateFormat({hour: '2-digit', minute: '2-digit', timeZoneName: 'short'});
	const localizedDate = formatter.format(date);
	const parts = localizedDate.split(' ');
	return parts[parts.length - 1];
};

export const appendTimeZoneCode = (date: string): string => {
	return `${date} ${getTimeZoneCode(new Date(date))}`;
};

const minute = 6e4;

Date.prototype.getTimezoneOffset = function() {
	const formatter = getDateFormat({year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short'});
	const localizedDate = formatter.format(this);
	const parts = localizedDate.split(' ');
	parts[parts.length - 1] = 'UTC';
	return Math.floor(this.getTime() / minute) - Math.floor(new Date(parts.join(' ')).getTime() / minute);
};
