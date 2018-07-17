import { formatTimeInterval } from './formatTimeInterval';
import { TimeUnit, TimeInterval } from '../models';
import expect = require('expect.js');

const timeInterval = (value: number, unit: TimeUnit): string => formatTimeInterval(<TimeInterval>{value, unit}, {separator: ' '});

describe('formatTimeInterval', () => {
	it('Milliseconds', () => {
		expect(timeInterval(1, TimeUnit.Milliseconds)).to.eql('1 millisecond');
		expect(timeInterval(2, TimeUnit.Milliseconds)).to.eql('2 milliseconds');
		expect(timeInterval(10000, TimeUnit.Milliseconds)).to.eql('10 seconds');
	});

	it('Seconds', () => {
		expect(timeInterval(1, TimeUnit.Seconds)).to.eql('1 second');
		expect(timeInterval(2, TimeUnit.Seconds)).to.eql('2 seconds');
		expect(timeInterval(120, TimeUnit.Seconds)).to.eql('2 minutes');
	});

	it('Minutes', () => {
		expect(timeInterval(1, TimeUnit.Minutes)).to.eql('1 minute');
		expect(timeInterval(2, TimeUnit.Minutes)).to.eql('2 minutes');
		expect(timeInterval(120, TimeUnit.Minutes)).to.eql('2 hours');
	});

	it('Hours', () => {
		expect(timeInterval(1, TimeUnit.Hours)).to.eql('1 hour');
		expect(timeInterval(2, TimeUnit.Hours)).to.eql('2 hours');
		expect(timeInterval(48, TimeUnit.Hours)).to.eql('2 days');
	});

	it('Days', () => {
		expect(timeInterval(1, TimeUnit.Days)).to.eql('1 day');
		expect(timeInterval(2, TimeUnit.Days)).to.eql('2 days');
		expect(timeInterval(48, TimeUnit.Days)).to.eql('48 days');
	});
});
