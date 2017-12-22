/* tslint:disable:no-http-string */

import {
	appendQuery,
	stripQuery,
	encodeQuery,
	parseQuery
} from './query-string';
import expect = require('expect.js');

describe('QueryString', () => {
	describe('appendQuery', () => {
		it('can append to href with no query params', () => {
			expect(appendQuery('http://localhost/', 'key', 'value')).to.eql('http://localhost/?key=value');
			expect(appendQuery('http://localhost/', {
				key1: 'value1',
				key2: 'value2'
			})).to.eql('http://localhost/?key1=value1&key2=value2');
		});

		it('can append to href with existing query params', () => {
			expect(appendQuery('http://localhost/?key1=value1', 'key2', 'value2')).to.eql('http://localhost/?key1=value1&key2=value2');
			expect(appendQuery('http://localhost/?key1=value1', {
				key2: 'value2',
				key3: 'value3'
			})).to.eql('http://localhost/?key1=value1&key2=value2&key3=value3');
		});

		it('should ignore null or undefined keys', () => {
			expect(appendQuery('http://localhost/', null)).to.eql('http://localhost/');
			expect(appendQuery('http://localhost/', undefined)).to.eql('http://localhost/');
		});

		it('should ignore null or undefined values', () => {
			expect(appendQuery('http://localhost/', 'key', null)).to.eql('http://localhost/');
			expect(appendQuery('http://localhost/', 'key', undefined)).to.eql('http://localhost/');
			expect(appendQuery('http://localhost/', {
				key1: 'val1',
				key2: undefined,
				key3: null
			})).to.eql('http://localhost/?key1=val1');
		});

		it('can add or replace', () => {
			expect(appendQuery('http://localhost/?key=val', 'key', 'modified')).to.eql('http://localhost/?key=modified');
			expect(appendQuery('http://localhost/?key1=val', {
				key1: 'modified',
				key2: 'val2'
			})).to.eql('http://localhost/?key1=modified&key2=val2');
		});

		it('can append array values', () => {
			expect(appendQuery('http://localhost/', 'key', ['val1', 'val2'])).to.eql('http://localhost/?key=val1,val2');
			expect(appendQuery('http://localhost/', {
				key1: ['val1', 'val2']
			})).to.eql('http://localhost/?key1=val1,val2');
		});

		it('should ignore empty array values', () => {
			expect(appendQuery('http://localhost/', 'key', [])).to.eql('http://localhost/');
			expect(appendQuery('http://localhost/', {
				key1: []
			})).to.eql('http://localhost/');
		});
	});

	describe('stripQuery', () => {
		it('can strip off existing query', () => {
			expect(stripQuery('http://localhost/?key=val')).to.eql('http://localhost/');
		});

		it('should return untouched if no query', () => {
			expect(stripQuery('http://localhost/')).to.eql('http://localhost/');
		});

		it('can handle null of undefined', () => {
			expect(stripQuery(null)).to.eql(null);
			expect(stripQuery(undefined)).to.eql(undefined);
		});
	});

	describe('encodeQuery', () => {
		it('can encode query', () => {
			expect(encodeQuery('key', 'val')).to.eql('key=val');
		});
	});

	describe('parseQuery', () => {
		it('can parse query from qualified URL', () => {
			expect(parseQuery('http://localhost/?key1=val1&key2=val2')).to.eql({
				key1: 'val1',
				key2: 'val2'
			});
		});

		it('can parse query from unqualified URL', () => {
			expect(parseQuery('key1=val1&key2=val2')).to.eql({
				key1: 'val1',
				key2: 'val2'
			});
		});

		it('can filter parsed query', () => {
			expect(parseQuery('http://localhost/?key1=val1&key2=val2', name => name === 'key1')).to.eql({
				key1: 'val1'
			});
		});

		it('can return undefined when no href', () => {
			expect(parseQuery(undefined)).to.eql(undefined);
			expect(parseQuery(null)).to.eql(undefined);
			expect(parseQuery('')).to.eql(undefined);
		});
	});
});
