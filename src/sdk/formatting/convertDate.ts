export type ConvertibleDate = Date | number | string;

export const convertDate = (value: ConvertibleDate): Date => {
	if (!value) {
		return null;
	}
	if (typeof value === 'number') {
		value = new Date(value * 1000);
	}
	if (typeof value === 'string') {
		value = new Date(value);
	}
	return value;
};
