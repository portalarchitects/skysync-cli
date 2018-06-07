const percentFormatter = new Intl.NumberFormat('en', {
	style: 'percent',
	maximumFractionDigits: 1
});

export const formatPercent = (number: number): string => {
	if (isNaN(number) || typeof(number) === 'undefined' || number === null) {
		return null;
	}
	return percentFormatter.format(number);
};
