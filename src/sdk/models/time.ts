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

export interface TimeInterval {
	value?: number;
	unit?: TimeUnit;
}
