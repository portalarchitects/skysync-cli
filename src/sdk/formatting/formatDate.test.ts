import { formatDate } from './formatDate';
import expect = require('expect.js');

describe('formatDate', () => {
	describe('relative', () => {
		const now = new Date('2016-04-10 12:00:00Z');

		it('should format seconds-distant dates', () => {
			expect(formatDate('2016-04-10 11:59:50Z', {now, allowRelative: true})).to.eql('Just now');
			expect(formatDate('2016-04-10 12:00:00Z', {now, allowRelative: true})).to.eql('Just now');
			expect(formatDate('2016-04-10 11:59:10Z', {now, allowRelative: true})).to.eql('1 minute ago');
		});

		it('should format minutes-distant dates', () => {
			expect(formatDate('2016-04-10 11:59Z', {now, allowRelative: true})).to.eql('1 minute ago');
			expect(formatDate('2016-04-10 11:55Z', {now, allowRelative: true})).to.eql('5 minutes ago');
			expect(formatDate('2016-04-10 11:15:00Z', {now, allowRelative: true})).to.eql('45 minutes ago');
			expect(formatDate('2016-04-10 11:10:00Z', {now, allowRelative: true})).to.eql('1 hour ago');
		});

		it('should format hours-distant dates', () => {
			expect(formatDate('2016-04-10 11:00Z', {now, allowRelative: true})).to.eql('1 hour ago');
			expect(formatDate('2016-04-10 00:00Z', {now, allowRelative: true})).to.eql('12 hours ago');
			expect(formatDate('2016-04-9 20:00Z', {now, allowRelative: true})).to.eql('16 hours ago');
			expect(formatDate('2016-04-9 14:00Z', {now, allowRelative: true, displayTime: false})).to.eql('1 day ago');
			expect(formatDate('2016-04-9 14:00Z', {now, allowRelative: true, displayTime: true})).to.eql('1 day ago at 2:00 PM');
		});

		it('should format days-distant dates', () => {
			expect(formatDate('2016-04-09 13:00Z', {now, allowRelative: true, displayTime: false})).to.eql('1 day ago');
			expect(formatDate('2016-04-08 13:00Z', {now, allowRelative: true, displayTime: false})).to.eql('2 days ago');
			expect(formatDate('2016-04-06 13:00Z', {now, allowRelative: true, displayTime: false})).to.eql('Apr 06');
			expect(formatDate('2015-04-06 13:00Z', {now, allowRelative: true, displayTime: false})).to.eql('Apr 06, 2015');

			expect(formatDate('2016-04-09 13:00Z', {now, allowRelative: true, displayTime: true})).to.eql('1 day ago at 1:00 PM');
			expect(formatDate('2016-04-08 13:00Z', {now, allowRelative: true, displayTime: true})).to.eql('2 days ago at 1:00 PM');
			expect(formatDate('2016-04-06 13:00Z', {now, allowRelative: true, displayTime: true})).to.eql('Apr 06, 1:00 PM');
			expect(formatDate('2015-04-06 13:00Z', {now, allowRelative: true, displayTime: true})).to.eql('Apr 06, 2015, 1:00 PM');
		});

		it('should not allow relative when in the past', () => {
			expect(formatDate('2016-04-10 11:59:50Z', {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Just now');
			expect(formatDate('2016-04-10 12:00:00Z', {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Just now');
			expect(formatDate('2016-04-09 13:00Z', {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Yesterday');
			expect(formatDate('2016-04-08 13:00Z', {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Apr 08');
			expect(formatDate('2016-04-06 13:00Z', {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Apr 06');
		});
	});

	describe('absolute', () => {
		const now = new Date('2016-04-10 12:00:00Z');

		it('should format contextual days', () => {
			expect(formatDate('2016-04-11 12:00:00Z', {now, allowRelative: false, displayTime: false})).to.eql('Tomorrow');
			expect(formatDate('2016-04-10 12:00:00Z', {now, allowRelative: false, displayTime: false})).to.eql('Today');
			expect(formatDate('2016-04-09 12:00:00Z', {now, allowRelative: false, displayTime: false})).to.eql('Yesterday');
			expect(formatDate('2016-04-08 12:00:00Z', {now, allowRelative: false, displayTime: false})).to.eql('Apr 08');
			expect(formatDate('2015-04-07 12:00:00Z', {now, allowRelative: false, displayTime: false})).to.eql('Apr 07, 2015');

			expect(formatDate('2016-04-11 12:00:00Z', {now, allowRelative: false, displayTime: true})).to.eql('Tomorrow at 12:00 PM');
			expect(formatDate('2016-04-10 12:00:00Z', {now, allowRelative: false, displayTime: true})).to.eql('Today at 12:00 PM');
			expect(formatDate('2016-04-09 12:00:00Z', {now, allowRelative: false, displayTime: true})).to.eql('Yesterday at 12:00 PM');
			expect(formatDate('2016-04-08 12:00:00Z', {now, allowRelative: false, displayTime: true})).to.eql('Apr 08, 12:00 PM');
			expect(formatDate('2015-04-07 12:00:00Z', {now, allowRelative: false, displayTime: true})).to.eql('Apr 07, 2015, 12:00 PM');
		});

		it('should format absolute outside of contextual', () => {
			expect(formatDate('2016-04-08 12:00:00Z', {now, allowRelative: false, displayTime: false})).to.eql('Apr 08');
			expect(formatDate('2015-04-07 12:00:00Z', {now, allowRelative: false, displayTime: false})).to.eql('Apr 07, 2015');

			expect(formatDate('2016-04-08 12:00:00Z', {now, allowRelative: false, displayTime: true})).to.eql('Apr 08, 12:00 PM');
			expect(formatDate('2015-04-07 12:00:00Z', {now, allowRelative: false, displayTime: true})).to.eql('Apr 07, 2015, 12:00 PM');
		});

		it('should format drop year when current year', () => {
			expect(formatDate('2016-04-08 12:00:00Z', {now, allowRelative: false, displayTime: false})).to.eql('Apr 08');
			expect(formatDate('2015-04-07 12:00:00Z', {now, allowRelative: false, displayTime: false})).to.eql('Apr 07, 2015');

			expect(formatDate('2016-04-08 12:00:00Z', {now, allowRelative: false, displayTime: true})).to.eql('Apr 08, 12:00 PM');
			expect(formatDate('2015-04-07 12:00:00Z', {now, allowRelative: false, displayTime: true})).to.eql('Apr 07, 2015, 12:00 PM');
		});

		it('should format drop time when outside current year', () => {
			expect(formatDate('2016-04-08 12:00:00Z', {now, allowRelative: false})).to.eql('Apr 08, 12:00 PM');
			expect(formatDate('2015-04-07 12:00:00Z', {now, allowRelative: false})).to.eql('Apr 07, 2015');
		});
	});
});
