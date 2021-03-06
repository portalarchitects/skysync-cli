import { IHttpClient } from '../http';
import { IEntityIdentifier } from '../models/base';
import { parse } from 'querystring';
import { CancellationToken } from '../cancellation-token';

export function getTypedResponse<T>(result: any, type?: string): T {
	if (!type) {
		type = result && result.type;
	}
	return result && <T>result[type];
}

function parseLink(link: any): any {
	const href = link && link.href;
	if (href) {
		const query = href.indexOf('?');
		if (query !== -1) {
			return parse(href.substring(query + 1));
		}
	}
	return null;
}

export function getPagedResponse<T>(response: any, items: T[]): PagedResult<T> {
	const meta = response && response.meta;
	return <PagedResult<T>>{
		offset: meta && meta.offset,
		limit: meta && meta.limit,
		totalCount: meta && meta.total_count,
		hasMore: Boolean(meta && meta.has_more),
		next: parseLink(meta && meta.links && meta.links.next),
		previous: parseLink(meta && meta.links && meta.links.prev),
		links: meta && meta.links,
		items
	};
}

export async function consumePagedResult<T>(handle: (item: T) => void, func: (params: any) => Promise<PagedResult<T>>, params?: any): Promise<void> {
	while (true) {
		const result = await func(params);
		if (result.items) {
			result.items.forEach(handle);
		}

		if (result.next) {
			params = result.next;
		} else {
			break;
		}
	}
}

export function consumePagedResource<T>(handle: (item: T) => void, resource: PagedResource<T>, params?: any): Promise<void> {
	return consumePagedResult(handle, resource.page, params);
}

export class BaseResource {
	public defaultParams: any;

	constructor(protected httpClient: IHttpClient) {}

	protected mergeDefaultParams(params: any): any {
		return this.mergeParams(this.defaultParams, params);
	}

	protected mergeParams(lhs: any, rhs: any): any {
		if (!lhs) {
			return rhs;
		}

		if (!rhs) {
			return lhs;
		}

		return Object.assign({}, lhs, rhs);
	}
}

export class Resource<TResource> extends BaseResource {
	constructor(httpClient: IHttpClient, protected singularName: string, protected pluralName: string = undefined, 
		protected singularType?: string, protected pluralType: string = undefined, protected resourcePath: string = undefined) {
		super(httpClient);
		
		if (!this.pluralName) {
			this.pluralName = `${this.singularName}s`;
		}

		if (this.singularType && !this.pluralType) {
			this.pluralType = `${this.singularType}s`;
		}

		if (!this.resourcePath) {
			this.resourcePath = this.pluralName;
		}
	}

	protected getList(result: any): TResource[] {
		return getTypedResponse<TResource[]>(result, this.pluralType || this.pluralName);
	}
	
	protected getSingle(result: any): TResource {
		return getTypedResponse<TResource>(result, this.singularType || this.singularName);
	}

	async list(params?: any, token?: CancellationToken): Promise<TResource[]> {
		const result = await this.httpClient.get(this.resourcePath, this.mergeDefaultParams(params), token);
		return this.getList(result);
	}

	async get(id: any, params?: any, token?: CancellationToken): Promise<TResource> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}`, this.mergeDefaultParams(params), token);
		return this.getSingle(result);
	}
}

type EditRequest = {
	id: string;
	payload?: any;
};

export function getEditRequest(body: any | string): EditRequest {
	if (typeof body === 'string') {
		return {
			id: <string>body
		};
	}

	const {
		id,
		...payload
	} = body;
	return {
		id,
		payload
	};
}

export class EditableResource<TResource extends IEntityIdentifier<string>> extends Resource<TResource> {
	constructor(httpClient: IHttpClient, name: string, type?: string, pluralName?: string, pluralType?: string, resourcePath?: string) {
		super(httpClient, name, pluralName, type, pluralType, resourcePath);
	}
	
	async add(body: TResource, params?: any, token?: CancellationToken): Promise<TResource> {
		const result = await this.httpClient.post(this.resourcePath, body, this.mergeDefaultParams(params), token);
		return this.getSingle(result);
	}

	async update(body: TResource | string, params?: any, token?: CancellationToken): Promise<TResource> {
		const request = getEditRequest(body);
		const result = await this.httpClient.put(`${this.resourcePath}/${request.id}`, request.payload, this.mergeDefaultParams(params), token);
		return this.getSingle(result);
	}

	async patch(body: TResource | string, params?: any, token?: CancellationToken): Promise<TResource> {
		const request = getEditRequest(body);
		const result = await this.httpClient.patch(`${this.resourcePath}/${request.id}`, request.payload, this.mergeDefaultParams(params), token);
		return this.getSingle(result);
	}

	delete(id: any, params?: any, token?: CancellationToken): Promise<boolean> {
		if (typeof id !== 'string' && Boolean(id && id.id)) {
			id = id.id;
		}
		return this.httpClient.delete(`${this.resourcePath}/${id}`, this.mergeDefaultParams(params), token);
	}

	deleteAll(params?: any, token?: CancellationToken): Promise<boolean> {
		return this.httpClient.delete(this.resourcePath, this.mergeDefaultParams(params), token);
	}
}

export interface PagedResult<TResource> {
	offset?: number;
	limit?: number;
	totalCount?: number;
	hasMore?: boolean;
	next?: any;
	previous?: any;
	items: TResource[];
}

export class PagedResource<TResource> extends EditableResource<TResource> {
	constructor(httpClient: IHttpClient, name: string, type?: string, pluralName?: string, pluralType?: string, resourcePath?: string) {
		super(httpClient, name, type, pluralName, pluralType, resourcePath);
	}

	async page(params?: any, token?: CancellationToken): Promise<PagedResult<TResource>> {
		const result = await this.httpClient.get(this.resourcePath, this.mergeDefaultParams(params), token);
		const items = this.getList(result);
		return getPagedResponse<TResource>(result, items);
	}
}

export interface IDownloadFileProvider {
	getDownloadRequestPath(id: string): string;
}
