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
});
