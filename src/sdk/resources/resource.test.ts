import 'mocha';
import expect = require('expect.js');
import { URL } from 'url';
import { TestHttpClient } from '../http/test-client';
import {
	Resource,
	EditableResource
} from './resource';

describe('EditableResource', () => {
	const client = new TestHttpClient();
	const objectUnderTest = new EditableResource(client, 'connection');

	describe('list', () => {
		it('should list all', async () => {
			await objectUnderTest.list();

			client.expectLastRequest({
				url: 'v1/connections',
				method: 'GET'
			});
		});

		it('should return typed response', async () => {
			const expectedResponses = [
				{ name: 'Test1' },
				{ name: 'Test2' }
			];
			client.addPendingResponse({
				statusCode: 200,
				body: JSON.stringify({
					type: 'connections',
					connections: expectedResponses
				})
			});
			expect(await objectUnderTest.list()).to.eql(expectedResponses);
		});
		
		it('should append additional parameters', async () => {
			await objectUnderTest.list({ active: true });
			
			client.expectLastRequest({
				url: 'v1/connections?active=true',
				method: 'GET'
			});
		});
	});

	describe('get', () => {
		it('should get by id', async () => {
			await objectUnderTest.get('123');

			client.expectLastRequest({
				url: 'v1/connections/123',
				method: 'GET'
			});
		});

		it('should return typed response', async () => {
			const expectedResponse = {
				name: 'Test'
			};
			client.addPendingResponse({
				statusCode: 200,
				body: JSON.stringify({
					type: 'connection',
					connection: expectedResponse
				})
			});
			expect(await objectUnderTest.get('123')).to.eql(expectedResponse);
		});
		
		it('should merge default parameters', async () => {
			const resource = new EditableResource(client, 'connection');
			resource.defaultParams = {
				limit: 10
			};

			await resource.get('123');
			
			client.expectLastRequest({
				url: 'v1/connections/123?limit=10',
				method: 'GET'
			});

			await resource.get('123', { active: true });
			
			client.expectLastRequest({
				url: 'v1/connections/123?limit=10&active=true',
				method: 'GET'
			});
		});
		
		it('should append additional parameters', async () => {
			await objectUnderTest.get('123', { active: true });
			
			client.expectLastRequest({
				url: 'v1/connections/123?active=true',
				method: 'GET'
			});
		});
		
		it('additional parameters should override defaults', async () => {
			const resource = new EditableResource(client, 'connection');
			resource.defaultParams = {
				limit: 10
			};

			await resource.get('123');
			
			client.expectLastRequest({
				url: 'v1/connections/123?limit=10',
				method: 'GET'
			});

			await resource.get('123', { limit: 20 });
			
			client.expectLastRequest({
				url: 'v1/connections/123?limit=20',
				method: 'GET'
			});
		});
	});

	const editOperations = {
		add: {method: 'POST', url: 'v1/connections'},
		update: {method: 'PUT', id: '123', url: 'v1/connections/123'},
		patch: {method: 'PATCH', id: '123', url: 'v1/connections/123'},
	};
	Object.keys(editOperations).forEach(op => {
		describe(op, () => {
			const method = editOperations[op].method;
			const url = editOperations[op].url;
			const id = editOperations[op].id;
			const body: any = {
				name: 'Test'
			};

			if (id) {
				body.id = id;
			}

			it(`should ${method} body`, async () => {
				await objectUnderTest[op](body);
	
				client.expectLastRequest({
					url,
					method,
					body
				});
			});
	
			it('should return typed response', async () => {
				client.addPendingResponse({
					statusCode: 200,
					body: JSON.stringify({
						type: 'connection',
						connection: body
					})
				});
				expect(await objectUnderTest[op](body)).to.eql(body);
			});
	
			it('should append additional parameters', async () => {
				await objectUnderTest[op](body, { active: true });
				
				client.expectLastRequest({
					url: `${url}?active=true`,
					method,
					body
				});
			});
		});
	});

	describe('delete', () => {
		it('should DELETE by id', async () => {
			await objectUnderTest.delete('123');

			client.expectLastRequest({
				url: 'v1/connections/123',
				method: 'DELETE'
			});
		});

		it('should append additional parameters', async () => {
			await objectUnderTest.delete('123', { active: true });

			client.expectLastRequest({
				url: 'v1/connections/123?active=true',
				method: 'DELETE'
			});
		});

		it('should return true on success', async () => {
			expect(await objectUnderTest.delete('123')).to.be(true);
		});
		
		it('should return false when not found', async () => {
			client.addPendingResponse({statusCode: 404});
			expect(await objectUnderTest.delete('123')).to.be(false);
		});
	});

	describe('deleteAll', () => {
		it('should DELETE', async () => {
			await objectUnderTest.deleteAll();

			client.expectLastRequest({
				url: 'v1/connections',
				method: 'DELETE'
			});
		});

		it('should append additional parameters', async () => {
			await objectUnderTest.deleteAll({ active: true });

			client.expectLastRequest({
				url: 'v1/connections?active=true',
				method: 'DELETE'
			});
		});

		it('should return true on success', async () => {
			expect(await objectUnderTest.deleteAll()).to.be(true);
		});
		
		it('should return false when not found', async () => {
			client.addPendingResponse({statusCode: 404});
			expect(await objectUnderTest.deleteAll()).to.be(false);
		});
	});
});
