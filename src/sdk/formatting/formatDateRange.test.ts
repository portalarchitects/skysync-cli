import { formatDateRange } from './formatDateRange';
import expect = require('expect.js');
import {appendTimeZoneCode} from './testUtil';

describe('formatDateRange', () => {
	const now = new Date(appendTimeZoneCode('2016-04-10 12:00:00'));
	const options = {
		now,
		separator: ' - '
	};

	it('can format date ranges', () => {
		expect(formatDateRange(appendTimeZoneCode('2016-04-10 4:34:50'), appendTimeZoneCode('2016-04-11 13:34:50'), options)).to.eql('Today - Tomorrow');
		expect(formatDateRange(appendTimeZoneCode('2016-04-10 0:34:50'), appendTimeZoneCode('2016-04-11 0:34:50'), options)).to.eql('Today - Tomorrow');
		expect(formatDateRange(appendTimeZoneCode('2016-04-10 23:34:50'), appendTimeZoneCode('2016-04-11 23:34:50'), options)).to.eql('Today - Tomorrow');
		expect(formatDateRange(appendTimeZoneCode('2016-04-6 4:34:50'), appendTimeZoneCode('2016-04-7 13:34:50'), options)).to.eql('Apr 06 - Apr 07');
		expect(formatDateRange(appendTimeZoneCode('2015-04-6 4:34:50'), appendTimeZoneCode('2015-04-7 13:34:50'), options)).to.eql('Apr 06, 2015 - Apr 07, 2015');
		expect(formatDateRange(appendTimeZoneCode('2016-04-10 4:34:50'), appendTimeZoneCode('2016-04-11 13:34:50'), {...options, requireStrict: true})).to.eql('Apr 10 - Apr 11');
	});

	it('should return `start` without separator when no `end`', () => {
		expect(formatDateRange(appendTimeZoneCode('2016-04-6 0:00:00'), null, options)).to.eql('Apr 06');
		expect(formatDateRange(appendTimeZoneCode('2016-04-6 23:59:59'), null, options)).to.eql('Apr 06');
		expect(formatDateRange(appendTimeZoneCode('2016-04-6 4:34:50'), null, options)).to.eql('Apr 06');
		expect(formatDateRange(appendTimeZoneCode('2016-04-6 14:34:50'), undefined, options)).to.eql('Apr 06');
	});

	it('should return `end` without separator when no `start`', () => {
		expect(formatDateRange(null, appendTimeZoneCode('2016-04-7 8:34:50'), options)).to.eql('Apr 07');
		expect(formatDateRange(undefined, appendTimeZoneCode('2016-04-7 18:34:50'), options)).to.eql('Apr 07');
	});

	it('should return null when no `start` or `end`', () => {
		expect(formatDateRange(null, null, options)).to.eql(null);
		expect(formatDateRange(undefined, undefined, options)).to.eql(null);
	});
});
