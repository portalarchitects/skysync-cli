import { convertDate, ConvertibleDate } from './convertDate';
import { formatRange, RangeFormatOptions } from './formatRange';
import { formatTime } from './formatTime';
import { getDateFormat } from './getDateFormat';
import { trimPrecedingZero } from './trimPrecedingZero';

const noSuffixFormat = getDateFormat({
	hour: '2-digit',
	minute: '2-digit',
	hour12: false
});

const isAM = (date: Date): boolean => {
	const minute = 6e4;
	const hour = 36e5;
	const day = 864e5;
	return ((date.getTime() - date.getTimezoneOffset() * minute) % day) / hour < 12;
};

const isSameTimeFrame = (start: Date, end: Date): boolean => {
	return isAM(start) === isAM(end);
};

const formatNoSuffix = (value: Date) => {
	const hours = value.getHours();
	if (hours >= 12) {
		value = new Date(value);
		value.setHours(hours - 12);
	}

	return trimPrecedingZero(noSuffixFormat.format(value));
};

export const formatTimeRange = (start: ConvertibleDate, end: ConvertibleDate, options?: RangeFormatOptions): string => {
	const startDate = convertDate(start);
	const endDate = convertDate(end);

	let separator = options && options.separator;
	if (typeof(separator) === 'undefined' || separator === null) {
		separator = '-';
	}

	const formattedStart = Boolean(startDate && endDate && isSameTimeFrame(startDate, endDate))
		? formatNoSuffix(startDate)
		: formatTime(startDate);
	const formattedEnd = formatTime(endDate);
	return formatRange(formattedStart, formattedEnd, {separator});
};
