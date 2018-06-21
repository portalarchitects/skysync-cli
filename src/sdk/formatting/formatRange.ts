export type RangeFormatOptions = {
	separator?: string;
};

export const formatRange = (start: string, end: string, options?: RangeFormatOptions): string => {
	if (start) {
		if (end) {
			let separator = options && options.separator;
			if (typeof(separator) === 'undefined' || separator === null) {
				separator = '\xa0-\xa0';
			}
			return `${start}${separator}${end}`;
		}
		return start;
	}
	if (end) {
		return end;
	}
	return null;
};
