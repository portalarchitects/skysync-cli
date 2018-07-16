export interface TimeOfDay {
	hr?: number;
	min?: number;
	sec?: number;
	ms?: number;
}

export enum TimeUnit {
	Nanoseconds = 'ns',
	Microseconds = 'us',
	Milliseconds = 'ms',
	Seconds = 's',
	Minutes = 'm',
	Hours = 'h',
	Days = 'd'
}

const NextTimeUnit = {
	[TimeUnit.Nanoseconds]: TimeUnit.Microseconds,
	[TimeUnit.Microseconds]: TimeUnit.Milliseconds,
	[TimeUnit.Milliseconds]: TimeUnit.Seconds,
	[TimeUnit.Seconds]: TimeUnit.Minutes,
	[TimeUnit.Minutes]: TimeUnit.Hours,
	[TimeUnit.Hours]: TimeUnit.Days
};

export interface TimeInterval {
	value?: number;
	unit?: TimeUnit;
}

const C0 = 1;
const C1 = C0 * 1000;
const C2 = C1 * 1000;
const C3 = C2 * 1000;
const C4 = C3 * 60;
const C5 = C4 * 60;
const C6 = C5 * 24;
const MAX = Number.MAX_VALUE;

type TimeUnitConverter = (d: number) => number;

type TimeUnitConverters = {
	[TimeUnit.Nanoseconds]: TimeUnitConverter;
	[TimeUnit.Microseconds]: TimeUnitConverter;
	[TimeUnit.Milliseconds]: TimeUnitConverter,
	[TimeUnit.Seconds]: TimeUnitConverter,
	[TimeUnit.Minutes]: TimeUnitConverter,
	[TimeUnit.Hours]: TimeUnitConverter,
	[TimeUnit.Days]: TimeUnitConverter
};

const Converters = {
	[TimeUnit.Nanoseconds]: <TimeUnitConverters>{
		[TimeUnit.Nanoseconds]: d => d,
		[TimeUnit.Microseconds]: d => d / (C1 / C0),
		[TimeUnit.Milliseconds]: d => d / (C2 / C0),
		[TimeUnit.Seconds]: d => d / (C3 / C0),
		[TimeUnit.Minutes]: d => d / (C4 / C0),
		[TimeUnit.Hours]: d => d / (C5 / C0),
		[TimeUnit.Days]: d => d / (C6 / C0)
	},

	[TimeUnit.Microseconds]: <TimeUnitConverters>{
		[TimeUnit.Nanoseconds]: d => scale(d, C1 / C0, MAX / (C1 / C0)),
		[TimeUnit.Microseconds]: d => d,
		[TimeUnit.Milliseconds]: d => d / (C2 / C1),
		[TimeUnit.Seconds]: d => d / (C3 / C1),
		[TimeUnit.Minutes]: d => d / (C4 / C1),
		[TimeUnit.Hours]: d => d / (C5 / C1),
		[TimeUnit.Days]: d => d / (C6 / C1)
	},

	[TimeUnit.Milliseconds]: <TimeUnitConverters>{
		[TimeUnit.Nanoseconds]: d => scale(d, C2 / C0, MAX / (C2 / C0)),
		[TimeUnit.Microseconds]: d => scale(d, C2 / C1, MAX / (C2 / C1)),
		[TimeUnit.Milliseconds]: d => d,
		[TimeUnit.Seconds]: d => d / (C3 / C2),
		[TimeUnit.Minutes]: d => d / (C4 / C2),
		[TimeUnit.Hours]: d => d / (C5 / C2),
		[TimeUnit.Days]: d => d / (C6 / C2)
	},

	[TimeUnit.Seconds]: <TimeUnitConverters>{
		[TimeUnit.Nanoseconds]: d => scale(d, C3 / C0, MAX / (C3 / C0)),
		[TimeUnit.Microseconds]: d => scale(d, C3 / C1, MAX / (C3 / C1)),
		[TimeUnit.Milliseconds]: d => scale(d, C3 / C2, MAX / (C3 / C2)),
		[TimeUnit.Seconds]: d => d,
		[TimeUnit.Minutes]: d => d / (C4 / C3),
		[TimeUnit.Hours]: d => d / (C5 / C3),
		[TimeUnit.Days]: d => d / (C6 / C3)
	},

	[TimeUnit.Minutes]: <TimeUnitConverters>{
		[TimeUnit.Nanoseconds]: d => scale(d, C4 / C0, MAX / (C4 / C0)),
		[TimeUnit.Microseconds]: d => scale(d, C4 / C1, MAX / (C4 / C1)),
		[TimeUnit.Milliseconds]: d => scale(d, C4 / C2, MAX / (C4 / C2)),
		[TimeUnit.Seconds]: d => scale(d, C4 / C3, MAX / (C4 / C3)),
		[TimeUnit.Minutes]: d => d,
		[TimeUnit.Hours]: d => d / (C5 / C4),
		[TimeUnit.Days]: d => d / (C6 / C4)
	},

	[TimeUnit.Hours]: <TimeUnitConverters>{
		[TimeUnit.Nanoseconds]: d => scale(d, C5 / C0, MAX / (C5 / C0)),
		[TimeUnit.Microseconds]: d => scale(d, C5 / C1, MAX / (C5 / C1)),
		[TimeUnit.Milliseconds]: d => scale(d, C5 / C2, MAX / (C5 / C2)),
		[TimeUnit.Seconds]: d => scale(d, C5 / C3, MAX / (C5 / C3)),
		[TimeUnit.Minutes]: d => scale(d, C5 / C4, MAX / (C5 / C4)),
		[TimeUnit.Hours]: d => d,
		[TimeUnit.Days]: d => d / (C6 / C5)
	},

	[TimeUnit.Days]: <TimeUnitConverters>{
		[TimeUnit.Nanoseconds]: d => scale(d, C6 / C0, MAX / (C6 / C0)),
		[TimeUnit.Microseconds]: d => scale(d, C6 / C1, MAX / (C6 / C1)),
		[TimeUnit.Milliseconds]: d => scale(d, C6 / C2, MAX / (C6 / C2)),
		[TimeUnit.Seconds]: d => scale(d, C6 / C3, MAX / (C6 / C3)),
		[TimeUnit.Minutes]: d => scale(d, C6 / C4, MAX / (C6 / C4)),
		[TimeUnit.Hours]: d => scale(d, C6 / C5, MAX / (C6 / C5)),
		[TimeUnit.Days]: d => d
	}
};

const scale = (d: number, m: number, over: number): number => {
	if (d > over) {
		return Number.MAX_VALUE;
	}

	if (d < -over) {
		return -Number.MAX_VALUE;
	}

	return d * m;
};

export const convertTimeInterval = (value: TimeInterval, toUnit: TimeUnit): TimeInterval => {
	const result = Converters[value.unit][toUnit](value.value);
	return {value: result, unit: toUnit};
};

export const toDisplayInterval = (value: TimeInterval, maxUnit: TimeUnit = TimeUnit.Days): TimeInterval => {
	if (!value) {
		return null;
	}

	let currentValue = value.value;
	let currentUnit = value.unit;

	while (currentValue > 1 && currentUnit !== maxUnit) {
		const nextUnit = NextTimeUnit[currentUnit];
		if (!nextUnit) {
			break;
		}

		const nextInterval = convertTimeInterval({value: currentValue, unit: currentUnit}, nextUnit);
		if (!nextInterval || nextInterval.value < 1) {
			break;
		}

		currentValue = nextInterval.value;
		currentUnit = nextInterval.unit;
	}

	return {value: currentValue, unit: currentUnit};
};
