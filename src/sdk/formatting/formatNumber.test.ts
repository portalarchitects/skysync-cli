import { formatNumber } from './formatNumber';
import expect = require('expect.js');

describe('formatNumber', () => {
	it('can format positive numbers', () => {
		expect(formatNumber(10)).to.eql('10');
		expect(formatNumber(100)).to.eql('100');
		expect(formatNumber(1000)).to.eql('1,000');
		expect(formatNumber(1000000)).to.eql('1,000,000');
	});

	it('can format negative numbers', () => {
		expect(formatNumber(-10)).to.eql('-10');
		expect(formatNumber(-100)).to.eql('-100');
		expect(formatNumber(-1000)).to.eql('-1,000');
		expect(formatNumber(-1000000)).to.eql('-1,000,000');
	});

	it('should restrict decimals to 2 places', () => {
		expect(formatNumber(10.2426345)).to.eql('10.24');
	});

	it('can format with unit', () => {
		expect(formatNumber(10, {unit: 'kg', separator: ''})).to.eql('10kg');
	});
});
