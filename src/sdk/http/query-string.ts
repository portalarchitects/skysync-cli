const URL = require('url').URL;

export function stripQuery(href: string): string {
	if (href) {
		const index = href.indexOf('?');
		if (index !== -1) {
			href = href.substring(0, index);
		}
	}

	return href;
}

function normalizeQuery(val: string | string[]): string {
	if (!val) {
		return undefined;
	}

	val = Array.isArray(val)
		? val.length === 0 ? undefined : val.map(encodeURIComponent).join(',')
		: encodeURIComponent(val);
	return val;
}

export function encodeQuery(key: string, val: string | string[]): string {
	val = normalizeQuery(val);
	if (!val) {
		return null;
	}	
	return `${encodeURIComponent(key)}=${val}`;
}

function replaceExistingQuery(href: string, key: string, val: string | string[]): string {
	key = encodeURIComponent(key);
	val = normalizeQuery(val);

	const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
	if (href.match(re)) {
		return href.replace(re, !val ? '$1$2' : '$1' + key + '=' + val + '$2');
	}

	return !val ? href : null;
}

export function parseQuery(href: string, filter?: (name: string) => boolean): any {
	if (!href || href.length === 0) {
		return undefined;
	}
	if (href.indexOf('://') === -1) {
		if (href.charAt(0) !== '?') {
			href = '?' + href;
		}
		// tslint:disable-next-line:no-http-string
		href = 'http://localhost/' + href;
	}

	const result = {};
	new URL(href).searchParams.forEach((value: string, name: string) => {
		if (!filter || filter(name)) {
			result[name] = value;
		}
	});
	return result;
}

export interface AppendQuery {
	(href: string, params: any): string;
	(href: string, key: string, val: any): string;
}

export const appendQuery: AppendQuery = function(href: string, keyOrParams: any, val?: any): string {
	if (!href || !keyOrParams) {
		return href;
	}

	let hasExisting = href.indexOf('?') !== -1;

	let queryString;
	if (typeof(keyOrParams) === 'string') {
		let result = hasExisting ? replaceExistingQuery(href, keyOrParams, val) : null;
		if (result === null) {
			const encodedValue = encodeQuery(keyOrParams, val);
			if (!encodedValue) {
				result = href;
			} else {
				result = href + (hasExisting ? '&' : '?') + encodedValue;
			}
		}
		return result;
	}

	if (hasExisting) {
		Object.keys(keyOrParams).forEach(key => {
			let result = replaceExistingQuery(href, key, keyOrParams[key]);
			if (result === null) {
				const encodedValue = encodeQuery(key, keyOrParams[key]);
				result = !encodedValue
					? href
					: (href + '&' + encodedValue);
				hasExisting = true;
			}
			href = result;
		});
		return href;
	}

	const encodedQuery = Object.keys(keyOrParams).map(key => encodeQuery(key, keyOrParams[key])).filter(x => Boolean(x)).join('&');
	if (encodedQuery && encodedQuery.length > 0) {
		href = href + (hasExisting ? '&' : '?') + encodedQuery;
	}
	return href;
}
