import { formatUnit } from './formatUnit';

const numberFormatter = new Intl.NumberFormat('en', {
	style: 'decimal',
	useGrouping: true,
	maximumFractionDigits: 2
});

export type NumberFormatOptions = {
	separator?: string;
	abbreviation?: boolean;
	unit?: string;
};

export const formatNumber = (number: number, options?: NumberFormatOptions, formatter: Intl.NumberFormat = numberFormatter): string => {
	if (!Boolean(number) || isNaN(number)) {
		number = 0;
	}

	const sign = Math.sign(number);
	number = Math.abs(number);

	let unit = options && options.unit;
	const showAbbreviation = Boolean(options?.abbreviation);
	if (showAbbreviation) {
		if (number > 99999 && number < 1000000) {
			unit = 'k';
			number = (number / 1000);
		} else if (number >= 1000000) {
			unit = 'm';
			number = (number / 1000000);
		}
	}

	let output = formatter.format(sign * number);
	if (unit) {
		output = formatUnit(output, unit, options?.separator);
	}

	return output;
};
