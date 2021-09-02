import { formatNumber } from './formatNumber';

export const formatCurrency = (number: number, locale: string = 'en', currency: string = 'USD'): string =>
	formatNumber(number, null, new Intl.NumberFormat(locale, {
		style: 'currency',
		currency
	}));
