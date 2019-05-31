import { formatBytes } from './formatBytes';
import expect = require('expect.js');

describe('formatBytes', () => {
	it('can format positive bytes', () => {
		expect(formatBytes(0)).to.eql('0\xa0B');
		expect(formatBytes(10)).to.eql('10\xa0B');
		expect(formatBytes(100)).to.eql('100\xa0B');
		expect(formatBytes(100, { separator: ' '})).to.eql('100 B');
		expect(formatBytes(100, { separator: ''})).to.eql('100B');
	});

	it('can format positive kb', () => {
		expect(formatBytes(Math.pow(2, 10))).to.eql('1\xa0KB');
		expect(formatBytes(Math.pow(2, 10) * 1.21)).to.eql('1.2\xa0KB');
		expect(formatBytes(Math.pow(2, 10) * 9.8)).to.eql('9.8\xa0KB');
	});

	it('can format positive mb', () => {
		expect(formatBytes(Math.pow(2, 20))).to.eql('1\xa0MB');
		expect(formatBytes(Math.pow(2, 20) * 1.213)).to.eql('1.2\xa0MB');
		expect(formatBytes(Math.pow(2, 20) * 9.81)).to.eql('9.8\xa0MB');
	});

	it('can format positive gb', () => {
		expect(formatBytes(Math.pow(2, 30))).to.eql('1\xa0GB');
		expect(formatBytes(Math.pow(2, 30) * 1.213)).to.eql('1.2\xa0GB');
		expect(formatBytes(Math.pow(2, 30) * 9.81)).to.eql('9.8\xa0GB');
	});

	it('can format positive tb', () => {
		expect(formatBytes(Math.pow(2, 40))).to.eql('1\xa0TB');
		expect(formatBytes(Math.pow(2, 40) * 1.213)).to.eql('1.2\xa0TB');
		expect(formatBytes(Math.pow(2, 40) * 9.81)).to.eql('9.8\xa0TB');
	});

	it('can format large positive values', () => {
		expect(formatBytes(Math.pow(2, 90))).to.eql('1,024\xa0YB');
		expect(formatBytes(Math.pow(2, 90) * 1.213)).to.eql('1,242.1\xa0YB');
		expect(formatBytes(Math.pow(2, 90) * 9.81)).to.eql('10,045.4\xa0YB');
	});

	it('can format negative bytes', () => {
		expect(formatBytes(-10)).to.eql('-10\xa0B');
		expect(formatBytes(-100)).to.eql('-100\xa0B');
	});

	it('can format negative kb', () => {
		expect(formatBytes(-Math.pow(2, 10))).to.eql('-1\xa0KB');
		expect(formatBytes(-Math.pow(2, 10) * 1.21)).to.eql('-1.2\xa0KB');
		expect(formatBytes(-Math.pow(2, 10) * 9.8)).to.eql('-9.8\xa0KB');
	});

	it('can format negative mb', () => {
		expect(formatBytes(-Math.pow(2, 20))).to.eql('-1\xa0MB');
		expect(formatBytes(-Math.pow(2, 20) * 1.21)).to.eql('-1.2\xa0MB');
		expect(formatBytes(-Math.pow(2, 20) * 9.8)).to.eql('-9.8\xa0MB');
	});

	it('can format negative gb', () => {
		expect(formatBytes(-Math.pow(2, 30))).to.eql('-1\xa0GB');
		expect(formatBytes(-Math.pow(2, 30) * 1.21)).to.eql('-1.2\xa0GB');
		expect(formatBytes(-Math.pow(2, 30) * 9.8)).to.eql('-9.8\xa0GB');
	});

	it('can format negative tb', () => {
		expect(formatBytes(-Math.pow(2, 40))).to.eql('-1\xa0TB');
		expect(formatBytes(-Math.pow(2, 40) * 1.21)).to.eql('-1.2\xa0TB');
		expect(formatBytes(-Math.pow(2, 40) * 9.8)).to.eql('-9.8\xa0TB');
	});

	it('can format large negative values', () => {
		expect(formatBytes(-Math.pow(2, 90))).to.eql('-1,024\xa0YB');
		expect(formatBytes(-Math.pow(2, 90) * 1.213)).to.eql('-1,242.1\xa0YB');
		expect(formatBytes(-Math.pow(2, 90) * 9.81)).to.eql('-10,045.4\xa0YB');
	});

	it('should return `0` when non-number', () => {
		expect(formatBytes(null)).to.eql('0\xa0B');
		expect(formatBytes(undefined)).to.eql('0\xa0B');
		expect(formatBytes(<any>'test')).to.eql('0\xa0B');
	});
});
