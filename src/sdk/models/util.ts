const units = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];
const maxExponent = units.length - 1;
const unitSize = 1024;
const unitBase = Math.log(unitSize);

const noDigit = new Intl.NumberFormat('en', {
	style: 'decimal',
	useGrouping: true,
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});

const withDigit = new Intl.NumberFormat('en', {
	style: 'decimal',
	useGrouping: true,
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});

const formatBytesImpl = (num: number): string => {
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

	const abbreviation = units[e];
	const formatter = e === 0 ? noDigit : withDigit;
	return `${negative ? '-' : ''}${formatter.format(num)}\xa0${abbreviation}`;
}

export namespace util {
	export const formatBytes = formatBytesImpl;
};
