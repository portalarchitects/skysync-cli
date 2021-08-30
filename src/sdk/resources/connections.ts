import { IHttpClient } from '../http';
import { PagedResult, getTypedResponse, getPagedResponse, BaseResource, Resource, PagedResource } from './resource';
import {
	StoragePlatform,
	Connection,
	Account,
	Group,
	PlatformItem,
	PlatformItemHierarchyLinks,
	ConnectionAuthorizePrompt,
	ItemStats
} from '../models';
import { CancellationToken } from '../cancellation-token';

export class StoragePlatformsResource extends Resource<StoragePlatform> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'platform');
		this.resourcePath = 'connections/platforms';
	}

	async authorize(platform: string, params?: any, token?: CancellationToken): Promise<ConnectionAuthorizePrompt> {
		const response = await this.httpClient.get(`${this.resourcePath}/${platform}/new`, params, token);
		return getTypedResponse<ConnectionAuthorizePrompt>(response);
	}
}

export class ConnectionsResource extends PagedResource<Connection> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'connection');
	}

	async authorize(platform: string, params?: any, token?: CancellationToken): Promise<ConnectionAuthorizePrompt> {
		const response = await this.httpClient.get(`${this.resourcePath}/platforms/${platform}/new`, params, token);
		return getTypedResponse<ConnectionAuthorizePrompt>(response);
	}

	async edit(id: string, params?: any, token?: CancellationToken): Promise<ConnectionAuthorizePrompt> {
		const response = await this.httpClient.get(`${this.resourcePath}/${id}/edit`, this.mergeDefaultParams(params), token);
		return getTypedResponse<ConnectionAuthorizePrompt>(response);
	}

	async assignPool(id: string, body: any, params?: any, token?: CancellationToken): Promise<Connection> {
		const response = await this.httpClient.patch(`${this.resourcePath}/${id}/pool`, body, this.mergeDefaultParams(params), token);
		return getTypedResponse<Connection>(response);
	}

	async unassignPool(id: string, params?: any, token?: CancellationToken): Promise<Connection> {
		const response = await this.httpClient.delete(`${this.resourcePath}/${id}/pool`, this.mergeDefaultParams(params), token);
		return getTypedResponse<Connection>(response);
	}
}

export class SecurityIdentifierResource<TResource> extends BaseResource {
	private pluralType: string;

	constructor(httpClient: IHttpClient, private resourceType: string) {
		super(httpClient);
		this.pluralType = `${resourceType}s`;
	}

	async list(connection: string, params?: any, token?: CancellationToken): Promise<TResource[]> {
		const result = await this.httpClient.get(`connections/${connection}/${this.pluralType}`, this.mergeDefaultParams(params), token);
		return getTypedResponse<TResource[]>(result, this.pluralType);
	}

	async page(connection: string, params?: any, token?: CancellationToken): Promise<PagedResult<TResource>> {
		const result = await this.httpClient.get(`connections/${connection}/${this.pluralType}`, this.mergeDefaultParams(params), token);
		const items = getTypedResponse<TResource[]>(result, this.pluralType);
		return getPagedResponse<TResource>(result, items);
	}

	async get(connection: string, id: any, params?: any, token?: CancellationToken): Promise<TResource> {
		const result = await this.httpClient.get(`connections/${connection}/${this.pluralType}/${id}`, this.mergeDefaultParams(params), token);
		return getTypedResponse<TResource>(result, this.resourceType);
	}
}

export class ConnectionItemsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	private async byHref<T>(href: string, params: any, parse: (result: any, items: PlatformItem[]) => T, canPost: boolean, token?: CancellationToken): Promise<T> {
		let result;
		const paramList = this.mergeDefaultParams(params);
		if(canPost && this.httpClient.shouldPost(href, paramList)) {
			var parameters = {}, body = {};
			for (const param in paramList) {
				if (param == "token") {
					body = paramList[param];
				} else {
					parameters[param] = paramList[param];
				}
			} 
			result = await this.httpClient.post(href, body, parameters, token);
		} else {
			result = await this.httpClient.get(href, paramList, token);
		}	
		const items = getTypedResponse<PlatformItem[]>(result, 'items');
		return parse(result, items);
	}

	list(connection: string, {id, ...params}: any = {}, token?: CancellationToken): Promise<PlatformItem[]> {
		return this.byHref(`connections/${connection}/items${id && `/${id}` || ''}`, params, (_, items) => items, false, token);
	}

	page(connection: string, {id, ...params}: any = {}, token?: CancellationToken): Promise<PagedResult<PlatformItem>> {
		return this.byHref(`connections/${connection}/items${id && `/${id}` || ''}`, params, (result, items) => getPagedResponse(result, items), false, token);
	}

	byRoot(connection: string, params?: any, token?: CancellationToken): Promise<PagedResult<PlatformItem>> {
		return this.byHref(`connections/${connection}/items`, params, (result, items) => getPagedResponse(result, items), true, token);
	}

	byParent(parent: {links: PlatformItemHierarchyLinks}, params?: any, token?: CancellationToken): Promise<PagedResult<PlatformItem>> {
		return this.byHref(parent.links.items.href, params, (result, items) => getPagedResponse(result, items), true, token);
	}
}

export class ConnectionStatsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(connection: string, params?: any, token?: CancellationToken): Promise<ItemStats> {
		return this.httpClient.get(`connections/${connection}/stats`, params, token);
	}

	async downloadCsv(connection: string, params?: any, token?: CancellationToken): Promise<string> {
		return this.httpClient.get(`connections/${connection}/stats.csv`, params, token);
	}
}

export class ConnectionAccountsResource extends SecurityIdentifierResource<Account> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'account');
	}
}

export class ConnectionGroupsResource extends SecurityIdentifierResource<Group> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'group');
	}
}
