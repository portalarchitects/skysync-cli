import { formatPercent } from './formatPercent';
import expect = require('expect.js');

describe('formatPercent', () => {
	it('can format positive percents', () => {
		expect(formatPercent(0.1)).to.eql('10%');
		expect(formatPercent(0.2)).to.eql('20%');
		expect(formatPercent(1.2)).to.eql('120%');
	});

	it('can format negative percents', () => {
		expect(formatPercent(-0.1)).to.eql('-10%');
		expect(formatPercent(-0.2)).to.eql('-20%');
		expect(formatPercent(-1.2)).to.eql('-120%');
	});

	it('can format zero percents', () => {
		expect(formatPercent(0)).to.eql('0%');
	});

	it('should restrict decimals to 1 place', () => {
		expect(formatPercent(0.2426345)).to.eql('24.3%');
	});

	it('should return null when non-number', () => {
		expect(formatPercent(null)).to.eql(null);
		expect(formatPercent(undefined)).to.eql(null);
		expect(formatPercent(<any>'test')).to.eql(null);
	});

	it('can restrict decimals to 0 places', () => {
		expect(formatPercent(0.2426345, { showIntegerPercent: true })).eql(
			'24%'
		);
	});

	it('should restrict decimals to 1 place when showIntegerPercent is false', () => {
		expect(formatPercent(0.2426345, { showIntegerPercent: false })).eql(
			'24.3%'
		);
	});

	it('should restrict decimals to 1 place when showIntegerPercent is undefined', () => {
		expect(formatPercent(0.2426345, { showIntegerPercent: undefined })).eql(
			'24.3%'
		);
	});
});
