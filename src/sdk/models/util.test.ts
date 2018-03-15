import { util } from './util';
import expect = require('expect.js');

describe('formatBytes', () => {
	it('can format positive bytes', () => {
		expect(util.formatBytes(10)).to.eql('10\xa0B');
		expect(util.formatBytes(100)).to.eql('100\xa0B');
	});

	it('can format positive kb', () => {
		expect(util.formatBytes(Math.pow(2, 10))).to.eql('1.0\xa0KB');
		expect(util.formatBytes(Math.pow(2, 10) * 1.21)).to.eql('1.2\xa0KB');
		expect(util.formatBytes(Math.pow(2, 10) * 9.8)).to.eql('9.8\xa0KB');
	});

	it('can format positive mb', () => {
		expect(util.formatBytes(Math.pow(2, 20))).to.eql('1.0\xa0MB');
		expect(util.formatBytes(Math.pow(2, 20) * 1.213)).to.eql('1.2\xa0MB');
		expect(util.formatBytes(Math.pow(2, 20) * 9.81)).to.eql('9.8\xa0MB');
	});

	it('can format positive gb', () => {
		expect(util.formatBytes(Math.pow(2, 30))).to.eql('1.0\xa0GB');
		expect(util.formatBytes(Math.pow(2, 30) * 1.213)).to.eql('1.2\xa0GB');
		expect(util.formatBytes(Math.pow(2, 30) * 9.81)).to.eql('9.8\xa0GB');
	});

	it('can format positive tb', () => {
		expect(util.formatBytes(Math.pow(2, 40))).to.eql('1.0\xa0TB');
		expect(util.formatBytes(Math.pow(2, 40) * 1.213)).to.eql('1.2\xa0TB');
		expect(util.formatBytes(Math.pow(2, 40) * 9.81)).to.eql('9.8\xa0TB');
	});

	it('can format large positive tb', () => {
		expect(util.formatBytes(Math.pow(2, 40) * 1024)).to.eql('1.0\xa0PB');
		expect(util.formatBytes(Math.pow(2, 40) * 1.213 * 1024)).to.eql('1.2\xa0PB');
		expect(util.formatBytes(Math.pow(2, 40) * 9.81 * 1024)).to.eql('9.8\xa0PB');
	});

	it('can format negative bytes', () => {
		expect(util.formatBytes(-10)).to.eql('-10\xa0B');
		expect(util.formatBytes(-100)).to.eql('-100\xa0B');
	});

	it('can format negative kb', () => {
		expect(util.formatBytes(-Math.pow(2, 10))).to.eql('-1.0\xa0KB');
		expect(util.formatBytes(-Math.pow(2, 10) * 1.21)).to.eql('-1.2\xa0KB');
		expect(util.formatBytes(-Math.pow(2, 10) * 9.8)).to.eql('-9.8\xa0KB');
	});

	it('can format negative mb', () => {
		expect(util.formatBytes(-Math.pow(2, 20))).to.eql('-1.0\xa0MB');
		expect(util.formatBytes(-Math.pow(2, 20) * 1.21)).to.eql('-1.2\xa0MB');
		expect(util.formatBytes(-Math.pow(2, 20) * 9.8)).to.eql('-9.8\xa0MB');
	});

	it('can format negative gb', () => {
		expect(util.formatBytes(-Math.pow(2, 30))).to.eql('-1.0\xa0GB');
		expect(util.formatBytes(-Math.pow(2, 30) * 1.21)).to.eql('-1.2\xa0GB');
		expect(util.formatBytes(-Math.pow(2, 30) * 9.8)).to.eql('-9.8\xa0GB');
	});

	it('can format negative tb', () => {
		expect(util.formatBytes(-Math.pow(2, 40))).to.eql('-1.0\xa0TB');
		expect(util.formatBytes(-Math.pow(2, 40) * 1.21)).to.eql('-1.2\xa0TB');
		expect(util.formatBytes(-Math.pow(2, 40) * 9.8)).to.eql('-9.8\xa0TB');
	});

	it('can format large negative tb', () => {
		expect(util.formatBytes(-Math.pow(2, 40) * 1024)).to.eql('-1.0\xa0PB');
		expect(util.formatBytes(-Math.pow(2, 40) * 1.213 * 1024)).to.eql('-1.2\xa0PB');
		expect(util.formatBytes(-Math.pow(2, 40) * 9.81 * 1024)).to.eql('-9.8\xa0PB');
	});

	it('can format large yb', () => {
		expect(util.formatBytes(Math.pow(2, 80) * 1024)).to.eql('1,024.0\xa0YB');
	});
});
