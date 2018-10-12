import { formatTime } from './formatTime';
import expect = require('expect.js');

const timeZoneCode = ' UTC-7';
Date.prototype.getTimezoneOffset = function () { return 420; };

describe('formatTime', () => {
	it('can format times', () => {
		expect(formatTime(`2016-04-10 4:34:50${timeZoneCode}`)).to.eql('4:34 AM');
		expect(formatTime(`2016-04-10 13:34:50${timeZoneCode}`)).to.eql('1:34 PM');
	});

	it('can display timezone name', () => {
		expect(formatTime(`2016-04-10 4:34:50${timeZoneCode}`, {showTimeZone: true})).to.eql('4:34 AM MST');
		expect(formatTime(`2016-04-10 13:34:50${timeZoneCode}`, {showTimeZone: true})).to.eql('1:34 PM MST');
	});
});
