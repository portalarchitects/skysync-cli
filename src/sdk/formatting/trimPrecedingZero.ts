export const trimPrecedingZero = (value: string): string => {
	if (value && value.indexOf('0') === 0) {
		value = value.substring(1);
	}
	return value;
};
