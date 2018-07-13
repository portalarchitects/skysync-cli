import { ConvertibleDate } from './convertDate';
import { formatRange, RangeFormatOptions } from './formatRange';
import { formatDate, DateFormatOptions } from './formatDate';

export const formatDateRange = (start: ConvertibleDate, end: ConvertibleDate, options?: RangeFormatOptions & DateFormatOptions): string => {
	options = options || {};
	options.allowRelative = false;

	if (typeof(options.displayTime) !== 'boolean') {
		options.displayTime = false;
	}

	return formatRange(formatDate(start, options), formatDate(end, options), options);
};
