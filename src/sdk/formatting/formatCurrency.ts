
export type CurrencyFormatOptions = { 
	locale?: string;
	currency?: string;
	wholeUnitsOnly?: boolean;
};

export const formatCurrency = (number: number, options?: CurrencyFormatOptions): string => {
	const formatter = new Intl.NumberFormat(options?.locale ?? 'en', {
		style: 'currency',
		currency: options?.currency ?? 'USD',
		minimumFractionDigits: options?.wholeUnitsOnly ? 0 : undefined,
		maximumFractionDigits: options?.wholeUnitsOnly ? 0 : undefined
	});

	if (!Boolean(number) || isNaN(number)) {
		number = 0;
	}
	return formatter.format(number);
};
