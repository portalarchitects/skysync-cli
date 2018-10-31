import { formatTime } from './formatTime';
import expect = require('expect.js');
import {appendTimeZoneCode, getTimeZoneCode} from './testUtil';

describe('formatTime', () => {
	it('can format times', () => {
		expect(formatTime(appendTimeZoneCode('2016-04-10 4:34:50'))).to.eql('4:34 AM');
		expect(formatTime(appendTimeZoneCode('2016-04-10 13:34:50'))).to.eql('1:34 PM');
	});

	it('can display timezone name standard', () => {
		const date = '2016-01-10 4:34:50';
		expect(formatTime(appendTimeZoneCode(date), {showTimeZone: true})).to.eql(`04:34 AM ${getTimeZoneCode(new Date(date))}`);
	});

	it('can display timezone name dst', () => {
		const date = '2016-07-10 13:34:50';
		expect(formatTime(appendTimeZoneCode(date), {showTimeZone: true})).to.eql(`01:34 PM ${getTimeZoneCode(new Date(date))}`);
	});
});
