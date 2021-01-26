import { formatDate } from './formatDate';
import expect = require('expect.js');
import {appendTimeZoneCode} from './testUtil';

describe('formatDate', () => {
	describe('relative', () => {
		const now = new Date(appendTimeZoneCode('2016-04-10 12:00:00'));

		it('should format seconds-distant dates', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-10 11:59:50'), {now, allowRelative: true})).to.eql('Just now');
			expect(formatDate(appendTimeZoneCode('2016-04-10 12:00:00'), {now, allowRelative: true})).to.eql('Just now');
			expect(formatDate(appendTimeZoneCode('2016-04-10 11:59:10'), {now, allowRelative: true})).to.eql('1 minute ago');
		});

		it('should format minutes-distant dates', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-10 11:59'), {now, allowRelative: true})).to.eql('1 minute ago');
			expect(formatDate(appendTimeZoneCode('2016-04-10 11:55'), {now, allowRelative: true})).to.eql('5 minutes ago');
			expect(formatDate(appendTimeZoneCode('2016-04-10 11:15:00'), {now, allowRelative: true})).to.eql('45 minutes ago');
			expect(formatDate(appendTimeZoneCode('2016-04-10 11:10:00'), {now, allowRelative: true})).to.eql('1 hour ago');
		});

		it('should format hours-distant dates', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-10 11:00'), {now, allowRelative: true})).to.eql('1 hour ago');
			expect(formatDate(appendTimeZoneCode('2016-04-10 00:00'), {now, allowRelative: true})).to.eql('12 hours ago');
			expect(formatDate(appendTimeZoneCode('2016-04-9 20:00'), {now, allowRelative: true})).to.eql('16 hours ago');
			expect(formatDate(appendTimeZoneCode('2016-04-9 14:00'), {now, allowRelative: true, displayTime: false})).to.eql('1 day ago');
			expect(formatDate(appendTimeZoneCode('2016-04-9 14:00'), {now, allowRelative: true, displayTime: true})).to.eql('1 day ago at 2:00 PM');
		});

		it('should format days-distant dates', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-09 13:00'), {now, allowRelative: true, displayTime: false})).to.eql('1 day ago');
			expect(formatDate(appendTimeZoneCode('2016-04-08 13:00'), {now, allowRelative: true, displayTime: false})).to.eql('2 days ago');
			expect(formatDate(appendTimeZoneCode('2016-04-06 13:00'), {now, allowRelative: true, displayTime: false})).to.eql('Apr 06');
			expect(formatDate(appendTimeZoneCode('2015-04-06 13:00'), {now, allowRelative: true, displayTime: false})).to.eql('Apr 06, 2015');

			expect(formatDate(appendTimeZoneCode('2016-04-09 13:00'), {now, allowRelative: true, displayTime: true})).to.eql('1 day ago at 1:00 PM');
			expect(formatDate(appendTimeZoneCode('2016-04-08 13:00'), {now, allowRelative: true, displayTime: true})).to.eql('2 days ago at 1:00 PM');
			expect(formatDate(appendTimeZoneCode('2016-04-06 13:00'), {now, allowRelative: true, displayTime: true})).to.eql('Apr 06, 1:00 PM');
			expect(formatDate(appendTimeZoneCode('2015-04-06 13:00'), {now, allowRelative: true, displayTime: true})).to.eql('Apr 06, 2015, 1:00 PM');
		});

		it('should not allow relative when in the past', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-10 11:59:50'), {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Just now');
			expect(formatDate(appendTimeZoneCode('2016-04-10 12:00:00'), {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Just now');
			expect(formatDate(appendTimeZoneCode('2016-04-09 13:00'), {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Yesterday');
			expect(formatDate(appendTimeZoneCode('2016-04-08 13:00'), {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Apr 08');
			expect(formatDate(appendTimeZoneCode('2016-04-06 13:00'), {now, allowRelative: true, displayTime: false, allowRelativeInDistantPast: false})).to.eql('Apr 06');
		});
		
		it('should format relative future dates', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-10 12:00:59'), {now, displayTime: false})).to.eql('Today');
			expect(formatDate(appendTimeZoneCode('2016-04-10 12:01:00'), {now, displayTime: false})).to.eql('Today');
			expect(formatDate(appendTimeZoneCode('2016-04-10 12:01:03'), {now, displayTime: false})).to.eql('Today');
			expect(formatDate(appendTimeZoneCode('2016-04-10 12:05:30'), {now, displayTime: false})).to.eql('Today');
			expect(formatDate(appendTimeZoneCode('2016-04-10 13:00'), {now, displayTime: false})).to.eql('Today');
			expect(formatDate(appendTimeZoneCode('2016-04-10 14:00'), {now, displayTime: false})).to.eql('Today');
			expect(formatDate(appendTimeZoneCode('2016-04-11 14:45'), {now, displayTime: false})).to.eql('Tomorrow');
			expect(formatDate(appendTimeZoneCode('2016-04-12 15:06'), {now, displayTime: false})).to.eql('Apr 12');
			expect(formatDate(appendTimeZoneCode('2016-04-14 12:21'), {now, displayTime: false})).to.eql('Apr 14');
			expect(formatDate(appendTimeZoneCode('2017-04-14 09:40'), {now, displayTime: false})).to.eql('Apr 14, 2017');
		});
	});

	describe('absolute', () => {
		const now = new Date(appendTimeZoneCode('2016-04-10 12:00:00'));

		it('should format contextual days', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-09 0:00:01'), {now, allowRelative: false, displayTime: false})).to.eql('Yesterday');
			expect(formatDate(appendTimeZoneCode('2016-04-09 23:59:59'), {now, allowRelative: false, displayTime: false})).to.eql('Yesterday');
			expect(formatDate(appendTimeZoneCode('2016-04-10 0:00:00'), {now, allowRelative: false, displayTime: false})).to.eql('Today');
			expect(formatDate(appendTimeZoneCode('2016-04-10 23:59:59'), {now, allowRelative: false, displayTime: false})).to.eql('Today');
			expect(formatDate(appendTimeZoneCode('2016-04-11 0:00:00'), {now, allowRelative: false, displayTime: false})).to.eql('Tomorrow');
			expect(formatDate(appendTimeZoneCode('2016-04-11 23:59:59'), {now, allowRelative: false, displayTime: false})).to.eql('Tomorrow');
			expect(formatDate(appendTimeZoneCode('2016-04-08 0:00:00'), {now, allowRelative: false, displayTime: false})).to.eql('Apr 08');
			expect(formatDate(appendTimeZoneCode('2016-04-08 23:59:59'), {now, allowRelative: false, displayTime: false})).to.eql('Apr 08');
			expect(formatDate(appendTimeZoneCode('2015-04-07 0:00:00'), {now, allowRelative: false, displayTime: false})).to.eql('Apr 07, 2015');
			expect(formatDate(appendTimeZoneCode('2015-04-07 23:59:59'), {now, allowRelative: false, displayTime: false})).to.eql('Apr 07, 2015');
			expect(formatDate(appendTimeZoneCode('2016-04-11 12:00:00'), {now, allowRelative: false, displayTime: true})).to.eql('Tomorrow at 12:00 PM');
			expect(formatDate(appendTimeZoneCode('2016-04-10 12:00:00'), {now, allowRelative: false, displayTime: true})).to.eql('Today at 12:00 PM');
			expect(formatDate(appendTimeZoneCode('2016-04-09 12:00:00'), {now, allowRelative: false, displayTime: true})).to.eql('Yesterday at 12:00 PM');
			expect(formatDate(appendTimeZoneCode('2016-04-08 12:00:00'), {now, allowRelative: false, displayTime: true})).to.eql('Apr 08, 12:00 PM');
			expect(formatDate(appendTimeZoneCode('2015-04-07 12:00:00'), {now, allowRelative: false, displayTime: true})).to.eql('Apr 07, 2015, 12:00 PM');
		});

		it('should format absolute outside of contextual', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-08 12:00:00'), {now, allowRelative: false, displayTime: false})).to.eql('Apr 08');
			expect(formatDate(appendTimeZoneCode('2015-04-07 12:00:00'), {now, allowRelative: false, displayTime: false})).to.eql('Apr 07, 2015');

			expect(formatDate(appendTimeZoneCode('2016-04-08 12:00:00'), {now, allowRelative: false, displayTime: true})).to.eql('Apr 08, 12:00 PM');
			expect(formatDate(appendTimeZoneCode('2015-04-07 12:00:00'), {now, allowRelative: false, displayTime: true})).to.eql('Apr 07, 2015, 12:00 PM');
		});

		it('should format drop year when current year', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-08 12:00:00'), {now, allowRelative: false, displayTime: false})).to.eql('Apr 08');
			expect(formatDate(appendTimeZoneCode('2015-04-07 12:00:00'), {now, allowRelative: false, displayTime: false})).to.eql('Apr 07, 2015');

			expect(formatDate(appendTimeZoneCode('2016-04-08 12:00:00'), {now, allowRelative: false, displayTime: true})).to.eql('Apr 08, 12:00 PM');
			expect(formatDate(appendTimeZoneCode('2015-04-07 12:00:00'), {now, allowRelative: false, displayTime: true})).to.eql('Apr 07, 2015, 12:00 PM');
		});

		it('should format drop time when outside current year', () => {
			expect(formatDate(appendTimeZoneCode('2016-04-08 12:00:00'), {now, allowRelative: false})).to.eql('Apr 08, 12:00 PM');
			expect(formatDate(appendTimeZoneCode('2015-04-07 12:00:00'), {now, allowRelative: false})).to.eql('Apr 07, 2015');
		});
	});
});
