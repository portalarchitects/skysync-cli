const percentFormatter = new Intl.NumberFormat('en', {
	style: 'percent',
	maximumFractionDigits: 1
});

const integerPercentFormatter = new Intl.NumberFormat('en', {
	style: 'percent',
	maximumFractionDigits: 0,
});

export type PercentFormatOptions = {
	showIntegerPercent?: boolean;
};

const getPercentFormatter = (
	options?: PercentFormatOptions
): Intl.NumberFormat => {
	return options && Boolean(options.showIntegerPercent)
		? integerPercentFormatter
		: percentFormatter;
};

export const formatPercent = (
	number?: number | null,
	options?: PercentFormatOptions | undefined
): string | null => {
	if (number === undefined || number === null || isNaN(number)) {
		return null;
	}

	return getPercentFormatter(options).format(number);
};
