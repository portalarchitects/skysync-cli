import { formatDateRange } from './formatDateRange';
import expect = require('expect.js');

describe('formatDateRange', () => {
	const now = new Date('2016-04-10 12:00:00Z');
	const options = {
		now,
		separator: ' - '
	};

	it('can format date ranges', () => {
		expect(formatDateRange('2016-04-10 4:34:50Z', '2016-04-11 13:34:50Z', options)).to.eql('Today - Tomorrow');
		expect(formatDateRange('2016-04-6 4:34:50Z', '2016-04-7 13:34:50Z', options)).to.eql('Apr 06 - Apr 07');
		expect(formatDateRange('2015-04-6 4:34:50Z', '2015-04-7 13:34:50Z', options)).to.eql('Apr 06, 2015 - Apr 07, 2015');
		expect(formatDateRange('2016-04-10 4:34:50Z', '2016-04-11 13:34:50Z', {...options, requireStrict: true})).to.eql('Apr 10 - Apr 11');
	});

	it('should return `start` without separator when no `end`', () => {
		expect(formatDateRange('2016-04-6 4:34:50Z', null, options)).to.eql('Apr 06');
		expect(formatDateRange('2016-04-6 14:34:50Z', undefined, options)).to.eql('Apr 06');
	});

	it('should return `end` without separator when no `start`', () => {
		expect(formatDateRange(null, '2016-04-7 8:34:50Z', options)).to.eql('Apr 07');
		expect(formatDateRange(undefined, '2016-04-7 18:34:50Z', options)).to.eql('Apr 07');
	});

	it('should return null when no `start` or `end`', () => {
		expect(formatDateRange(null, null, options)).to.eql(null);
		expect(formatDateRange(undefined, undefined, options)).to.eql(null);
	});
});
