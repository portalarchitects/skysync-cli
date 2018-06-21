import { ConvertibleDate } from './convertDate';
import { formatRange, RangeFormatOptions } from './formatRange';
import { formatDate, DateFormatOptions } from './formatDate';

export const formatDateRange = (start: ConvertibleDate, end: ConvertibleDate, options?: RangeFormatOptions & DateFormatOptions): string => {
	options = options || {};
	options.absolute = true;

	if (typeof(options.time) !== 'boolean') {
		options.time = false;
	}

	return formatRange(formatDate(start, options), formatDate(end, options), options);
};
