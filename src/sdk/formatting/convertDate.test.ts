import { convertDate } from './convertDate';
import expect = require('expect.js');

describe('convertDate', () => {
	it('can parse text dates', () => {
		expect(convertDate('2016-04-10 11:00Z')).to.eql(new Date('2016-04-10 11:00Z'));
	});

	it('should forward Dates', () => {
		expect(convertDate(new Date('2016-04-10 11:00Z'))).to.eql(new Date('2016-04-10 11:00Z'));
	});

	it('can convert Unix dates', () => {
		expect(convertDate(1460286000)).to.eql(new Date('2016-04-10 11:00Z'));
	});

	it('should return `null` when no date', () => {
		expect(convertDate(null)).to.eql(null);
		expect(convertDate(undefined)).to.eql(null);
	});
});
