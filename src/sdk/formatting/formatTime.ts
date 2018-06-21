import { convertDate, ConvertibleDate } from './convertDate';
import { getDateFormat } from './getDateFormat';
import { trimPrecedingZero } from './trimPrecedingZero';

const timeFormat = getDateFormat({
	hour: '2-digit',
	minute: '2-digit'
});

const timeZoneFormat = getDateFormat({
	hour: '2-digit',
	minute: '2-digit',
	timeZoneName: 'short'
});

export type TimeFormatOptions = {
	showTimeZone?: boolean;
};

export const formatTime = (value: ConvertibleDate, options?: TimeFormatOptions): string => {
	const date = convertDate(value);
	if (!date) {
		return null;
	}

	const formatter = options && options.showTimeZone && timeZoneFormat || timeFormat;
	return trimPrecedingZero(formatter.format(date));
};
