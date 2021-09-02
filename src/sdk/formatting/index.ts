import { formatBytes } from './formatBytes';
import { formatCurrency } from './formatCurrency';
import { formatNumber } from './formatNumber';
import { formatDate } from './formatDate';
import { formatTime } from './formatTime';
import { formatTimeInterval, TimeIntervalFormatOptions } from './formatTimeInterval';
import { formatRange } from './formatRange';
import { formatDateRange } from './formatDateRange';
import { formatTimeRange } from './formatTimeRange';
import { formatPercent } from './formatPercent';
import { TimeInterval } from '../models';

export { RelativeDate } from './RelativeDate';

// The intent of the code in this directory is to conform to the formatting standards
// recommended in the design system: https://skysync.atlassian.net/wiki/spaces/PUCS/pages/323649654/Data+formats

export const DataFormatter = {
	formatBytes,
	formatCurrency,
	formatNumber,
	formatDate,
	formatTime,
	// This is required to work around a compiler issue
	formatTimeInterval: (value: TimeInterval, options?: TimeIntervalFormatOptions) => formatTimeInterval(value, options),
	formatRange,
	formatDateRange,
	formatTimeRange,
	formatPercent
};
