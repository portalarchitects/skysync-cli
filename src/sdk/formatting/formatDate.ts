import { convertDate, ConvertibleDate } from './convertDate';
import { formatTime } from './formatTime';
import { getDateFormat } from './getDateFormat';
import { RelativeDate } from './RelativeDate';

export type DateFormatOptions = {
	now?: Date;
	allowRelative?: boolean;
	requireStrict?: boolean;
	displayTime?: boolean;
	displayTimeZone?: boolean;
	allowRelativeInDistantPast?: boolean;
	format?: any;
};

type FormatMethod = (date: Date) => string;

const absoluteFormats = {
	time: getDateFormat({
		hour: '2-digit',
		minute: '2-digit'
	}),
	timeWithZone: getDateFormat({
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short'
	}),
	short: getDateFormat({
		year: 'numeric',
		day: '2-digit',
		month: 'short'
	}),
	shortSameYear: getDateFormat({
		day: '2-digit',
		month: 'short'
	}),
	full: getDateFormat({
		year: 'numeric',
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit'
	}),
	fullSameYear: getDateFormat({
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit'
	}),
	fullWithZone: getDateFormat({
		year: 'numeric',
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short'
	}),
	fullWithZoneSameYear: getDateFormat({
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short'
	}),
};

const absoluteFormatWithTime = {
	sameDay: (date: Date): string => 'Today at ' + absoluteFormats.time.format(date),
	nextDay: (date: Date): string => 'Tomorrow at ' + absoluteFormats.time.format(date),
	lastDay: (date: Date): string => 'Yesterday at ' + absoluteFormats.time.format(date)
};

const absoluteFormatWithTimeZone = {
	sameDay: (date: Date): string => 'Today at ' + absoluteFormats.timeWithZone.format(date),
	nextDay: (date: Date): string => 'Tomorrow at ' + absoluteFormats.timeWithZone.format(date),
	lastDay: (date: Date): string => 'Yesterday at ' + absoluteFormats.timeWithZone.format(date)
};

const absoluteFormatNoTime = {
	sameDay: (): string => 'Today',
	nextDay: (): string => 'Tomorrow',
	lastDay: (): string => 'Yesterday'
};

const relativeTimeThresholds = {
	seconds: 20,        // just now
	minutes: 45,        // X minutes ago
	hours: 18,           // X hours ago
	days: 3,            // X days ago
};

const relativeTimeLabels = {
	ss: 'Just now',
	m: '%d minute ago',
	mm: '%d minutes ago',
	h: '%d hour ago',
	hh: '%d hours ago',
	d: '%d day ago',
	dd: '%d days ago'
};

const defaultOptions = (options: DateFormatOptions): DateFormatOptions => {
	if (!options) {
		options = {};
	}

	if (!options.now) {
		options.now = new Date();
	}

	if (typeof(options.allowRelative) !== 'boolean') {
		options.allowRelative = true;
	}

	if (typeof(options.allowRelativeInDistantPast) !== 'boolean') {
		options.allowRelativeInDistantPast = options.allowRelative;
	}

	return options;
};

const getNamedRelativeFormat = (value: number, label: string, options: DateFormatOptions): FormatMethod => {
	label = label.replace(/%d/i, value.toLocaleString('en'));
	if (options && options.displayTime) {
		return date => `${label} at ${formatTime(date, {showTimeZone: options.displayTimeZone})}`;
	}
	return () => label;
};

const getConditionalRelativeFormat = (value: number, threshold: number, labelOne: string, labelMany, options?: DateFormatOptions): FormatMethod => {
	if (value <= threshold) {
		if (labelOne && value <= 1) {
			return getNamedRelativeFormat(1, labelOne, options);
		}
		return getNamedRelativeFormat(value, labelMany, options);
	}
	return null;
};

const getRelativeFormat = (value: RelativeDate, options: DateFormatOptions): FormatMethod => {
	value = value.abs();
	return getConditionalRelativeFormat(value.seconds, relativeTimeThresholds.seconds, null, relativeTimeLabels.ss)
		|| (options.allowRelativeInDistantPast && getConditionalRelativeFormat(value.minutes, relativeTimeThresholds.minutes, relativeTimeLabels.m, relativeTimeLabels.mm))
		|| (options.allowRelativeInDistantPast && getConditionalRelativeFormat(value.hours, relativeTimeThresholds.hours, relativeTimeLabels.h, relativeTimeLabels.hh))
		|| (options.allowRelativeInDistantPast && getConditionalRelativeFormat(value.days, relativeTimeThresholds.days, relativeTimeLabels.d, relativeTimeLabels.dd, options));
};

const getAbsoluteFormatName = (value: RelativeDate): 'lastDay' | 'sameDay' | 'nextDay' | 'else' => {
	const days = value.days;
	if (days >= -1 && days < 0) {
		return 'lastDay';
	}
	if (days >= 0 && days < 1) {
		return 'sameDay';
	}
	if (days >= 1 && days < 2) {
		return 'nextDay';
	}
	return null;
};

const getAbsoluteFormat = (value: RelativeDate, options: DateFormatOptions): FormatMethod => {
	const formatName = Boolean(options && options.requireStrict) ? null : getAbsoluteFormatName(value);
	if (formatName) {
		const formatList = options.displayTime ? (options.displayTimeZone ? absoluteFormatWithTimeZone : absoluteFormatWithTime) : absoluteFormatNoTime;
		return formatList[formatName];
	}

	const formatter = value.isCurrentYear
		? options.displayTime
			? (options.displayTimeZone ? absoluteFormats.fullWithZoneSameYear : absoluteFormats.fullSameYear)
			: absoluteFormats.shortSameYear
		: options.displayTime
			? (options.displayTimeZone ? absoluteFormats.fullWithZone : absoluteFormats.full)
			: absoluteFormats.short;
	return formatter.format;
};

const formatAbsoluteDate = (value: RelativeDate, options: DateFormatOptions): string => {
	const format = getAbsoluteFormat(value, options);
	return format(value.date);
};

const formatRelativeDate = (value: RelativeDate, options: DateFormatOptions): string => {
	const format = getRelativeFormat(value, options) || getAbsoluteFormat(value, options);
	return format(value.date);
};

export const formatDate = (value: ConvertibleDate, options?: DateFormatOptions): string => {
	const date = convertDate(value);
	if (!date) {
		return null;
	}

	options = defaultOptions(options);

	if (options.format) {
		return getDateFormat(options.format).format(date);
	}

	const relativeDate = new RelativeDate(date, options.now);
	if (typeof(options.displayTime) !== 'boolean') {
		options.displayTime = relativeDate.isCurrentYear;
	}

	return !options.requireStrict && options.allowRelative ? formatRelativeDate(relativeDate, options) : formatAbsoluteDate(relativeDate, options);
};
