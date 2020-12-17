import 'mocha';
import expect = require('expect.js');
import { TestHttpClient } from '../http/test-client';
import {
	PagedResource,
	PagedResult,
	consumePagedResult
} from './resource';

describe('PagedResource', () => {
	const client = new TestHttpClient();
	const objectUnderTest = new PagedResource(client, 'connection');

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
			const resource = new PagedResource(client, 'connection');
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
			const resource = new PagedResource(client, 'connection');
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
			const payload = Object.assign({}, body);

			if (id) {
				payload.id = id;

				it(`can ${method} empty body with id`, async () => {
					await objectUnderTest[op](id);
		
					client.expectLastRequest({
						url,
						method
					});
				});
			}

			it(`should ${method} body`, async () => {
				await objectUnderTest[op](payload);
	
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
						connection: payload
					})
				});
				expect(await objectUnderTest[op](payload)).to.eql(payload);
			});
	
			it('should append additional parameters', async () => {
				await objectUnderTest[op](payload, { active: true });
				
				client.expectLastRequest({
					url: `${url}?active=true`,
					method,
					payload
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

		it('should DELETE by parameter.id', async () => {
			await objectUnderTest.delete({id: '123'});

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

	describe('page', () => {
		it('should process meta', async () => {
			const expectedResponses = [
				{ name: 'Test1' },
				{ name: 'Test2' }
			];

			client.addPendingResponse({
				statusCode: 200,
				body: JSON.stringify({
					type: 'connections',
					meta: {
						has_more: true,
						offset: 10,
						limit: 100,
						total_count: 1000,
						links: {
							next: {
								// eslint:disable-next-line:no-http-string
								href: 'http://localhost:9090/v1/jobs?offset=12&limit=6&sort=name+ASC&fields=count%2Cid%2Cname%2Cprevious_execution.start_time%2Cstatus', 
							},
							prev: {
								// eslint:disable-next-line:no-http-string
								href: 'http://localhost:9090/v1/jobs?offset=0&limit=6&sort=name+ASC&fields=count%2Cid%2Cname%2Cprevious_execution.start_time%2Cstatus',
							}
						}
					},
					connections: expectedResponses
				})
			});

			const result = await objectUnderTest.page();
			expect(result.hasMore).to.eql(true);
			expect(result.offset).to.eql(10);
			expect(result.limit).to.eql(100);
			expect(result.totalCount).to.eql(1000);

			expect(result.next.offset).to.eql(12);
			expect(result.next.limit).to.eql(6);
			expect(result.next.sort).to.eql('name ASC');
			expect(result.next.fields).to.eql('count,id,name,previous_execution.start_time,status');

			expect(result.previous.offset).to.eql(0);
			expect(result.previous.limit).to.eql(6);
			expect(result.previous.sort).to.eql('name ASC');
			expect(result.previous.fields).to.eql('count,id,name,previous_execution.start_time,status');
			
			expect(result.items).to.eql(expectedResponses);
		});

		it('can consume all pages', async () => {
			const expectedResponses = [
				{ name: 'Test1' },
				{ name: 'Test2' }
			];

			const actualResponses = [];

			await consumePagedResult<any>(item => actualResponses.push(item), params => {
				const hasMore = !Boolean(params);
				return Promise.resolve(<PagedResult<any>>{
					hasMore,
					next: hasMore ? {} : undefined,
					items: hasMore ? [expectedResponses[0]] : [expectedResponses[1]]
				});
			});

			expect(actualResponses).to.eql(expectedResponses);
		});
	});
});
