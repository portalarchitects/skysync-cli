import { formatTime } from './formatTime';
import expect = require('expect.js');

describe('formatTime', () => {
	it('can format times', () => {
		expect(formatTime('2016-04-10 4:34:50Z')).to.eql('4:34 AM');
		expect(formatTime('2016-04-10 13:34:50Z')).to.eql('1:34 PM');
	});

	it('can display timezone name', () => {
		expect(formatTime('2016-04-10 4:34:50Z', {showTimeZone: true})).to.eql('4:34 AM UTC');
		expect(formatTime('2016-04-10 13:34:50Z', {showTimeZone: true})).to.eql('1:34 PM UTC');
	});
});
