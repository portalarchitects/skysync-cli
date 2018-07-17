import { TimeInterval, TimeUnit, toDisplayInterval } from '../models';
import { formatNumber } from './formatNumber';

const TimeUnitDescriptions = {
	[TimeUnit.Nanoseconds]: 'nanosecond',
	[TimeUnit.Microseconds]: 'microsecond',
	[TimeUnit.Milliseconds]: 'millisecond',
	[TimeUnit.Seconds]: 'second',
	[TimeUnit.Minutes]: 'minute',
	[TimeUnit.Hours]: 'hour',
	[TimeUnit.Days]: 'day'
};

export type TimeIntervalFormatOptions = {
	separator?: string;
};

export const formatTimeInterval = (value: TimeInterval, options?: TimeIntervalFormatOptions): string => {
	const display = toDisplayInterval(value);
	if (!display) {
		return null;
	}

	let unit = TimeUnitDescriptions[display.unit];
	if (display.value > 1) {
		unit += 's';
	}

	return formatNumber(display.value, {unit, separator: options && options.separator});
};
