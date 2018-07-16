import { TimeOfDay } from '../models';

export type ConvertibleDate = Date | number | string | any;

const isTimeOfDay = value => {
	return value.hasOwnProperty('hr')
		|| value.hasOwnProperty('min')
		|| value.hasOwnProperty('sec')
		|| value.hasOwnProperty('ms');
};

const convertTimeOfDay = (value: TimeOfDay): Date => {
	const date = new Date();
	date.setUTCHours(value.hr || 0);
	date.setUTCMinutes(value.min || 0);
	date.setUTCSeconds(value.sec || 0);
	date.setUTCMilliseconds(value.ms || 0);
	return date;
};

export const convertDate = (value: ConvertibleDate): Date => {
	if (!value) {
		return null;
	}
	if (typeof value === 'number') {
		return new Date(value * 1000);
	}
	if (typeof value === 'string') {
		return new Date(value);
	}
	if (isTimeOfDay(value)) {
		return convertTimeOfDay(<TimeOfDay>value);
	}
	return <Date>value;
};
