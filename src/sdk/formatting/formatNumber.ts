import { formatUnit } from './formatUnit';

const numberFormatter = new Intl.NumberFormat('en', {
	style: 'decimal',
	useGrouping: true,
	maximumFractionDigits: 2
});

export type NumberFormatOptions = {
	separator?: string;
	unit?: string;
};

export const formatNumber = (number: number, options?: NumberFormatOptions): string => {
	if (!Boolean(number) || isNaN(number)) {
		number = 0;
	}
	
	let output = numberFormatter.format(number);
	if (options && options.unit) {
		output = formatUnit(output, options.unit, options.separator);
	}

	return output;
};
