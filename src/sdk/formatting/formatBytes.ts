import { formatUnit } from './formatUnit';

const units = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];
const maxExponent = units.length - 1;
const unitSize = 1024;
const unitBase = Math.log(unitSize);

const byteFormat = new Intl.NumberFormat('en', {
	style: 'decimal',
	useGrouping: true,
	minimumFractionDigits: 0,
	maximumFractionDigits: 1
});

export type ByteFormatOptions = {
	separator?: string;
	abbreviation?: boolean;
};

export const formatBytes = (num: number, options: ByteFormatOptions = null): string => {
	if (isNaN(num)) {
		num = 0;
	}

	const negative = num < 0;
	if (negative) {
		num = -num;
	}

	let e = Math.floor(Math.log(num) / unitBase);
	if (e < 0) {
		e = 0;
	} else if (e > maxExponent) {
		e = maxExponent;
	}

	if (e > 0) {
		num = num / Math.pow(2, e * 10);
	}

	let output = `${negative ? '-' : ''}${byteFormat.format(num)}`;

	const showAbbreviation = typeof(options && options.abbreviation) === 'boolean' ? options.abbreviation : true;
	if (showAbbreviation) {
		output = formatUnit(output, units[e], options && options.separator);
	}

	return output;
};
