import { formatRange } from './formatRange';
import expect = require('expect.js');

describe('formatRange', () => {
	it('can format ranges', () => {
		expect(formatRange('a', 'b')).to.eql('a\xa0-\xa0b');
		expect(formatRange('100', '200')).to.eql('100\xa0-\xa0200');
	});

	it('can format with custom separator', () => {
		expect(formatRange('a', 'b', {separator: '-'})).to.eql('a-b');
	});

	it('should return `start` without separator when no `end`', () => {
		expect(formatRange('a', null)).to.eql('a');
		expect(formatRange('a', undefined)).to.eql('a');
	});

	it('should return `end` without separator when no `start`', () => {
		expect(formatRange(null, 'b')).to.eql('b');
		expect(formatRange(undefined, 'b')).to.eql('b');
	});

	it('should return null when no `start` or `end`', () => {
		expect(formatRange(null, null)).to.eql(null);
		expect(formatRange(undefined, undefined)).to.eql(null);
	});
});
