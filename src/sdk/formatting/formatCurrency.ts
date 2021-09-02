import { formatNumber } from './formatNumber';

export const formatCurrency = (number: number, locale: string = 'en', currency: string = 'USD', wholeUnitsOnly: boolean = false): string =>
	formatNumber(number, null, new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		minimumFractionDigits: wholeUnitsOnly ? 0 : undefined,
		maximumFractionDigits: wholeUnitsOnly ? 0 : undefined
	}));
