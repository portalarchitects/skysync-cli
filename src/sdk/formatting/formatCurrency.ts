
export type CurrencyFormatOptions = { 
	locale?: string;
	currency?: string;
};

export const formatCurrency = (number: number, options: CurrencyFormatOptions = { locale: 'en', currency: 'USD' }, wholeUnitsOnly: boolean = false): string => {
	const formatter = new Intl.NumberFormat(options.locale, {
		style: 'currency',
		currency: options.currency,
		minimumFractionDigits: wholeUnitsOnly ? 0 : undefined,
		maximumFractionDigits: wholeUnitsOnly ? 0 : undefined
	});

	if (!Boolean(number) || isNaN(number)) {
		number = 0;
	}
	return formatter.format(number);
};
