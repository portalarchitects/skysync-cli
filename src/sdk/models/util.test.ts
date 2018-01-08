import { util } from './util';
import expect = require('expect.js');

describe('formatBytes', () => {
	it('can format positive bytes', () => {
		expect(util.formatBytes(10)).to.eql('10');
		expect(util.formatBytes(100)).to.eql('100');
	});

	it('can format positive kb', () => {
		expect(util.formatBytes(Math.pow(2, 10))).to.eql('1.0 KB');
		expect(util.formatBytes(Math.pow(2, 10) * 1.21)).to.eql('1.2 KB');
		expect(util.formatBytes(Math.pow(2, 10) * 9.8)).to.eql('9.8 KB');
	});

	it('can format positive mb', () => {
		expect(util.formatBytes(Math.pow(2, 20))).to.eql('1.0 MB');
		expect(util.formatBytes(Math.pow(2, 20) * 1.213)).to.eql('1.21 MB');
		expect(util.formatBytes(Math.pow(2, 20) * 9.81)).to.eql('9.81 MB');
	});

	it('can format positive gb', () => {
		expect(util.formatBytes(Math.pow(2, 30))).to.eql('1.0 GB');
		expect(util.formatBytes(Math.pow(2, 30) * 1.213)).to.eql('1.21 GB');
		expect(util.formatBytes(Math.pow(2, 30) * 9.81)).to.eql('9.81 GB');
	});

	it('can format positive tb', () => {
		expect(util.formatBytes(Math.pow(2, 40))).to.eql('1.0 TB');
		expect(util.formatBytes(Math.pow(2, 40) * 1.213)).to.eql('1.213 TB');
		expect(util.formatBytes(Math.pow(2, 40) * 9.81)).to.eql('9.81 TB');
	});

	it('can format large positive tb', () => {
		expect(util.formatBytes(Math.pow(2, 40) * 1000)).to.eql('1,000.0 TB');
		expect(util.formatBytes(Math.pow(2, 40) * 1.213 * 1000)).to.eql('1,213.0 TB');
		expect(util.formatBytes(Math.pow(2, 40) * 9.81 * 1000)).to.eql('9,810.0 TB');
	});

	it('can format negative bytes', () => {
		expect(util.formatBytes(-10)).to.eql('-10');
		expect(util.formatBytes(-100)).to.eql('-100');
	});

	it('can format negative kb', () => {
		expect(util.formatBytes(-Math.pow(2, 10))).to.eql('-1.0 KB');
		expect(util.formatBytes(-Math.pow(2, 10) * 1.21)).to.eql('-1.2 KB');
		expect(util.formatBytes(-Math.pow(2, 10) * 9.8)).to.eql('-9.8 KB');
	});

	it('can format negative mb', () => {
		expect(util.formatBytes(-Math.pow(2, 20))).to.eql('-1.0 MB');
		expect(util.formatBytes(-Math.pow(2, 20) * 1.21)).to.eql('-1.21 MB');
		expect(util.formatBytes(-Math.pow(2, 20) * 9.8)).to.eql('-9.8 MB');
	});

	it('can format negative gb', () => {
		expect(util.formatBytes(-Math.pow(2, 30))).to.eql('-1.0 GB');
		expect(util.formatBytes(-Math.pow(2, 30) * 1.21)).to.eql('-1.21 GB');
		expect(util.formatBytes(-Math.pow(2, 30) * 9.8)).to.eql('-9.8 GB');
	});

	it('can format negative tb', () => {
		expect(util.formatBytes(-Math.pow(2, 40))).to.eql('-1.0 TB');
		expect(util.formatBytes(-Math.pow(2, 40) * 1.21)).to.eql('-1.21 TB');
		expect(util.formatBytes(-Math.pow(2, 40) * 9.8)).to.eql('-9.8 TB');
	});

	it('can format large negative tb', () => {
		expect(util.formatBytes(-Math.pow(2, 40) * 1000)).to.eql('-1,000.0 TB');
		expect(util.formatBytes(-Math.pow(2, 40) * 1.213 * 1000)).to.eql('-1,213.0 TB');
		expect(util.formatBytes(-Math.pow(2, 40) * 9.81 * 1000)).to.eql('-9,810.0 TB');
	});
});
