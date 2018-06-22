import { formatTimeRange } from './formatTimeRange';
import expect = require('expect.js');

describe('formatTimeRange', () => {
	it('can format time ranges', () => {
		expect(formatTimeRange('2016-04-10 4:34:50Z', '2016-04-10 13:34:50Z')).to.eql('4:34 AM-1:34 PM');
	});

	it('should trim suffix when both produce same suffix', () => {
		expect(formatTimeRange('2016-04-10 4:34:50Z', '2016-04-10 8:34:50Z')).to.eql('4:34-8:34 AM');
		expect(formatTimeRange('2016-04-10 14:34:50Z', '2016-04-10 18:34:50Z')).to.eql('2:34-6:34 PM');
	});

	it('should return `start` without separator when no `end`', () => {
		expect(formatTimeRange('2016-04-10 4:34:50Z', null)).to.eql('4:34 AM');
		expect(formatTimeRange('2016-04-10 14:34:50Z', undefined)).to.eql('2:34 PM');
	});

	it('should return `end` without separator when no `start`', () => {
		expect(formatTimeRange(null, '2016-04-10 8:34:50Z')).to.eql('8:34 AM');
		expect(formatTimeRange(undefined, '2016-04-10 18:34:50Z')).to.eql('6:34 PM');
	});

	it('should return null when no `start` or `end`', () => {
		expect(formatTimeRange(null, null)).to.eql(null);
		expect(formatTimeRange(undefined, undefined)).to.eql(null);
	});
});