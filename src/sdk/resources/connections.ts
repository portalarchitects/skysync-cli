import { IHttpClient } from '../http';
import { PagedResult, getTypedResponse, getPagedResponse, BaseResource, Resource, PagedResource } from './resource';
import {
	StoragePlatform,
	Connection,
	Account,
	Group,
	PlatformItem,
	PlatformItemHierarchyLinks,
	ConnectionAuthorizePrompt
} from '../models';

export class StoragePlatformsResource extends Resource<StoragePlatform> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'platform');
		this.resourcePath = 'connections/platforms';
	}

	async authorize(platform: string, params?: any): Promise<ConnectionAuthorizePrompt> {
		const response = await this.httpClient.get(`${this.resourcePath}/${platform}/new`, params);
		return getTypedResponse<ConnectionAuthorizePrompt>(response);
	}
}

export class ConnectionsResource extends PagedResource<Connection> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'connection');
	}

	async authorize(platform: string, params?: any): Promise<ConnectionAuthorizePrompt> {
		const response = await this.httpClient.get(`${this.resourcePath}/platforms/${platform}/new`, params);
		return getTypedResponse<ConnectionAuthorizePrompt>(response);
	}

	async edit(id: string, params?: any): Promise<ConnectionAuthorizePrompt> {
		const response = this.httpClient.get(`${this.resourcePath}/${id}/edit`, this.mergeDefaultParams(params));
		return getTypedResponse<ConnectionAuthorizePrompt>(response);
	}

	async assignPool(id: string, body: any, params?: any): Promise<Connection> {
		const response = this.httpClient.patch(`${this.resourcePath}/${id}/pool`, body, params);
		return getTypedResponse<Connection>(response);
	}

	async unassignPool(id: string, params?: any): Promise<Connection> {
		const response = this.httpClient.delete(`${this.resourcePath}/${id}/pool`, this.mergeDefaultParams(params));
		return getTypedResponse<Connection>(response);
	}
}

export class SecurityIdentifierResource<TResource> extends BaseResource {
	private pluralType: string;

	constructor(httpClient: IHttpClient, private resourceType: string) {
		super(httpClient);
		this.pluralType = `${resourceType}s`;
	}

	async list(connection: string, params?: any): Promise<TResource[]> {
		const result = await this.httpClient.get(`connections/${connection}/${this.pluralType}`, this.mergeDefaultParams(params));
		return getTypedResponse<TResource[]>(result, this.pluralType);
	}

	async page(connection: string, params?: any): Promise<PagedResult<TResource>> {
		const result = await this.httpClient.get(`connections/${connection}/${this.pluralType}`, this.mergeDefaultParams(params));
		const items = getTypedResponse<TResource[]>(result, this.pluralType);
		return getPagedResponse<TResource>(result, items);
	}

	async get(connection: string, id: any, params?: any): Promise<TResource> {
		const result = await this.httpClient.get(`connections/${connection}/${this.pluralType}/${id}`, this.mergeDefaultParams(params));
		return getTypedResponse<TResource>(result, this.resourceType);
	}
}

export class ConnectionItemsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	private getList(result: any): PlatformItem[] {
		return getTypedResponse<PlatformItem[]>(result, 'items');
	}

	private async byHref<T>(href: string, params: any, parse: (result: any, items: PlatformItem[]) => T): Promise<T> {
		const result = await this.httpClient.get(href, this.mergeDefaultParams(params));
		const items = getTypedResponse<PlatformItem[]>(result, 'items');
		return parse(result, items);
	}

	list(connection: string, {id, ...params}: any = {}): Promise<PlatformItem[]> {
		return this.byHref(`connections/${connection}/items${id && `/${id}` || ''}`, params, (_, items) => items);
	}

	page(connection: string, {id, ...params}: any = {}): Promise<PagedResult<PlatformItem>> {
		return this.byHref(`connections/${connection}/items${id && `/${id}` || ''}`, params, (result, items) => getPagedResponse(result, items));
	}

	byRoot(connection: string, params?: any): Promise<PagedResult<PlatformItem>> {
		return this.byHref(`connections/${connection}/items`, params, (result, items) => getPagedResponse(result, items));
	}

	byParent(parent: {links: PlatformItemHierarchyLinks}, params?: any): Promise<PagedResult<PlatformItem>> {
		return this.byHref(parent.links.items.href, params, (result, items) => getPagedResponse(result, items));
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
