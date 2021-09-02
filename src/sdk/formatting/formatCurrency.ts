
export type CurrencyFormatOptions = { 
	locale?: string;
	currency?: string;
};

export const formatCurrency = (number: number, options?: CurrencyFormatOptions, wholeUnitsOnly: boolean = false): string => {
	const formatter = new Intl.NumberFormat(options?.locale ?? 'en', {
		style: 'currency',
		currency: options?.currency ?? 'USD',
		minimumFractionDigits: wholeUnitsOnly ? 0 : undefined,
		maximumFractionDigits: wholeUnitsOnly ? 0 : undefined
	});

	if (!Boolean(number) || isNaN(number)) {
		number = 0;
	}
	return formatter.format(number);
};
