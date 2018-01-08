import { util } from './util';
import expect = require('expect.js');

describe('formatBytes', () => {
	it('can format positive bytes', () => {
		expect(util.formatBytes(10)).to.eql('10');
		expect(util.formatBytes(100)).to.eql('100');
	});

	it('can format positive kb', () => {
		expect(util.formatBytes(1000)).to.eql('1.0 KB');
		expect(util.formatBytes(1210)).to.eql('1.2 KB');
		expect(util.formatBytes(9810)).to.eql('9.8 KB');
	});

	it('can format positive mb', () => {
		expect(util.formatBytes(1000000)).to.eql('1.0 MB');
		expect(util.formatBytes(1210000)).to.eql('1.21 MB');
		expect(util.formatBytes(9810000)).to.eql('9.81 MB');
	});

	it('can format positive gb', () => {
		expect(util.formatBytes(1000000000)).to.eql('1.0 GB');
		expect(util.formatBytes(1210000000)).to.eql('1.21 GB');
		expect(util.formatBytes(9810000000)).to.eql('9.81 GB');
	});

	it('can format positive tb', () => {
		expect(util.formatBytes(1000000000000)).to.eql('1.0 TB');
		expect(util.formatBytes(1210000000000)).to.eql('1.21 TB');
		expect(util.formatBytes(9812000000000)).to.eql('9.812 TB');
	});

	it('can format large positive tb', () => {
		expect(util.formatBytes(1000000000000000)).to.eql('1,000.0 TB');
		expect(util.formatBytes(1210000000000000)).to.eql('1,210.0 TB');
		expect(util.formatBytes(9812000000000000)).to.eql('9,812.0 TB');
	});

	it('can format negative bytes', () => {
		expect(util.formatBytes(-10)).to.eql('-10');
		expect(util.formatBytes(-100)).to.eql('-100');
	});

	it('can format negative kb', () => {
		expect(util.formatBytes(-1000)).to.eql('-1.0 KB');
		expect(util.formatBytes(-1210)).to.eql('-1.2 KB');
		expect(util.formatBytes(-9810)).to.eql('-9.8 KB');
	});

	it('can format negative mb', () => {
		expect(util.formatBytes(-1000000)).to.eql('-1.0 MB');
		expect(util.formatBytes(-1210000)).to.eql('-1.21 MB');
		expect(util.formatBytes(-9810000)).to.eql('-9.81 MB');
	});

	it('can format negative gb', () => {
		expect(util.formatBytes(-1000000000)).to.eql('-1.0 GB');
		expect(util.formatBytes(-1210000000)).to.eql('-1.21 GB');
		expect(util.formatBytes(-9810000000)).to.eql('-9.81 GB');
	});

	it('can format negative tb', () => {
		expect(util.formatBytes(-1000000000000)).to.eql('-1.0 TB');
		expect(util.formatBytes(-1210000000000)).to.eql('-1.21 TB');
		expect(util.formatBytes(-9812000000000)).to.eql('-9.812 TB');
	});

	it('can format large negative tb', () => {
		expect(util.formatBytes(-1000000000000000)).to.eql('-1,000.0 TB');
		expect(util.formatBytes(-1210000000000000)).to.eql('-1,210.0 TB');
		expect(util.formatBytes(-9812000000000000)).to.eql('-9,812.0 TB');
	});
});
