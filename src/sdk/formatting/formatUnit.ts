export const formatUnit = (value: string, unit?: string, separator?: string): string => {
	if (unit) {
		if (typeof(separator) === 'undefined' || separator === null) {
			separator = '\xa0';
		}
		value = `${value}${separator}${unit}`;
	}

	return value;
};
