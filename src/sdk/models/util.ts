const unitsAndFormatDigit = [
	['KB', 1],
	['MB', 2],
	['GB', 2],
	['TB', 3]
];
const maxByteDigit = unitsAndFormatDigit.length - 1;
const formatBytesImpl = (num: number): string => {
	const negative = num < 0;
	num = Math.abs(num);

	let index = -1;
	while (num >= 1000) {
		num = num / 1000;
		index++;
		if (index === maxByteDigit) {
			break;
		}
	}

	const unit = (index >= 0 ? unitsAndFormatDigit[index] : null);
	const abbreviation = unit && ` ${unit[0]}` || '';
	const digit = <number>(unit && unit[1] || 0);
	const byteFormatter = new Intl.NumberFormat('en', {
		style: 'decimal',
		useGrouping: true,
		minimumFractionDigits: Math.min(digit, 1),
		maximumFractionDigits: digit
	});
	return `${negative ? '-' : ''}${byteFormatter.format(num)}${abbreviation}`;
}

export namespace util {
	export const formatBytes = formatBytesImpl;
};
