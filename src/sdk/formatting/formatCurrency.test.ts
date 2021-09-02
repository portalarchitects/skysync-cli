import { formatCurrency } from './formatCurrency';
import expect = require('expect.js');

describe('formatCurrency', () => {
	it('can format positive numbers', () => {
		expect(formatCurrency(10)).to.eql('$10.00');
		expect(formatCurrency(100)).to.eql('$100.00');
		expect(formatCurrency(1000)).to.eql('$1,000.00');
		expect(formatCurrency(1000000)).to.eql('$1,000,000.00');
	});

	it('can format negative numbers', () => {
		expect(formatCurrency(-10)).to.eql('-$10.00');
		expect(formatCurrency(-100)).to.eql('-$100.00');
		expect(formatCurrency(-1000)).to.eql('-$1,000.00');
		expect(formatCurrency(-1000000)).to.eql('-$1,000,000.00');
	});

	it('should restrict decimals to exactly 2 places', () => {
		expect(formatCurrency(10.2426345)).to.eql('$10.24');
		expect(formatCurrency(10.2)).to.eql('$10.20');
	});

	it('can format other currencies', () => {
		expect(formatCurrency(1042758.2426345, {
			locale: 'de-DE',
			currency: 'EUR'
		})).to.eql('1.042.758,24\xa0€');
		expect(formatCurrency(1042758.2426345, {
			locale: 'ja-JP',
			currency: 'JPY'
		})).to.eql('￥1,042,758');
	});

	it('can format whole units only', () => {
		expect(formatCurrency(1042758.2426345, {
			locale: 'de-DE',
			currency: 'EUR'
		})).to.eql('1.042.758,24\xa0€');
		expect(formatCurrency(1042758.2426345, {
			locale: 'ja-JP',
			currency: 'JPY'
		})).to.eql('￥1,042,758');
	});

	it('can format whole units only', () => {
		expect(formatCurrency(1042758.2426345, {
			locale: 'en',
			currency: 'USD'
		}, true)).to.eql('$1,042,758');
		expect(formatCurrency(1042758.25, {
			locale: 'en',
			currency: 'USD'
		}, true)).to.eql('$1,042,758');
		expect(formatCurrency(1042758.2, {
			locale: 'en',
			currency: 'USD'
		}, true)).to.eql('$1,042,758');
	});
});
