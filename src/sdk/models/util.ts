const unitsAndFormatDigit = [
	['B', 0],
	['KB', 1],
	['MB', 2],
	['GB', 2],
	['TB', 3]
];
const maxByteDigit = unitsAndFormatDigit.length - 1;
const unitSize = 1024;

const formatBytesImpl = (num: number): string => {
	const negative = num < 0;
	num = Math.abs(num);

	let index = 0;
	while (num >= unitSize) {
		num = num / unitSize;
		index++;
		if (index === maxByteDigit) {
			break;
		}
	}

	const [abbreviation, digit] = unitsAndFormatDigit[index];
	const byteFormatter = new Intl.NumberFormat('en', {
		style: 'decimal',
		useGrouping: true,
		minimumFractionDigits: Math.min(<number>digit, 1),
		maximumFractionDigits: <number>digit
	});
	return `${negative ? '-' : ''}${byteFormatter.format(num)} ${abbreviation}`;
}

export namespace util {
	export const formatBytes = formatBytesImpl;
};
