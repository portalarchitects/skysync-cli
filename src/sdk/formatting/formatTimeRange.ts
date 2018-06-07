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

const isSameTimeFrame = (start: Date, end: Date): boolean => {
	const isStartAM = start.getUTCHours() < 12;
	const isEndAM = end.getUTCHours() < 12;
	return isStartAM === isEndAM;
};

const formatNoSuffix = (value: Date) => {
	const hours = value.getUTCHours();
	if (hours >= 12) {
		value = new Date(value);
		value.setUTCHours(hours - 12);
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
