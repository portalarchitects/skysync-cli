import { formatBytes } from './formatBytes';
import { formatNumber } from './formatNumber';
import { formatDate } from './formatDate';
import { formatTime } from './formatTime';
import { formatRange } from './formatRange';
import { formatDateRange } from './formatDateRange';
import { formatTimeRange } from './formatTimeRange';
import { formatPercent } from './formatPercent';

// The intent of the code in this directory is to conform to the formatting standards
// recommended in the design system: https://skysync.atlassian.net/wiki/spaces/PUCS/pages/323649654/Data+formats

export const DataFormatter = {
	formatBytes,
	formatNumber,
	formatDate,
	formatTime,
	formatRange,
	formatDateRange,
	formatTimeRange,
	formatPercent
};
