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

const TimeUnitAbbreviations = {
	[TimeUnit.Nanoseconds]: 'ns',
	[TimeUnit.Microseconds]: 'µs',
	[TimeUnit.Milliseconds]: 'ms',
	[TimeUnit.Seconds]: 'sec',
	[TimeUnit.Minutes]: 'min',
	[TimeUnit.Hours]: 'hr',
	[TimeUnit.Days]: 'day'
};

const PluralAbbreviations = {
	[TimeUnit.Nanoseconds]: TimeUnitAbbreviations[TimeUnit.Nanoseconds],
	[TimeUnit.Microseconds]: TimeUnitAbbreviations[TimeUnit.Microseconds],
	[TimeUnit.Milliseconds]: TimeUnitAbbreviations[TimeUnit.Milliseconds],
	[TimeUnit.Seconds]: 'secs',
	[TimeUnit.Minutes]: 'mins',
	[TimeUnit.Hours]: 'hrs',
	[TimeUnit.Days]: 'days'
};

export type TimeIntervalFormatOptions = {
	separator?: string;
	abbreviate?: boolean;
};

export const formatTimeInterval = (value: TimeInterval, options?: TimeIntervalFormatOptions): string => {
	const display = toDisplayInterval(value);
	if (!display) {
		return null;
	}

	let unit;
	if (options && options.abbreviate) {
		unit = (display.value > 1 ? PluralAbbreviations : TimeUnitAbbreviations)[display.unit];
	} else {
		unit = TimeUnitDescriptions[display.unit];
		if (display.value > 1) {
			unit += 's';
		}
	}

	return formatNumber(display.value, {unit, separator: options && options.separator});
};
