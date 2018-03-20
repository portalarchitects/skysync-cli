import { IHttpClient } from '../http';
import { IEntityIdentifier } from '../models/base';
import * as qs from 'querystring';

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
			return qs.parse(href.substring(query + 1));
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

	async list(params?: any): Promise<TResource[]> {
		const result = await this.httpClient.get(this.resourcePath, this.mergeDefaultParams(params));
		return this.getList(result);
	}

	async get(id: any, params?: any): Promise<TResource> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}`, this.mergeDefaultParams(params));
		return this.getSingle(result);
	}
}

function getEditRequest(body: any | string): {id: string, payload?: any} {
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
	
	async add(body: TResource, params?: any): Promise<TResource> {
		const result = await this.httpClient.post(`${this.resourcePath}`, body, this.mergeDefaultParams(params));
		return this.getSingle(result);
	}

	async update(body: TResource | string, params?: any): Promise<TResource> {
		const request = getEditRequest(body);
		const result = await this.httpClient.put(`${this.resourcePath}/${request.id}`, request.payload, this.mergeDefaultParams(params));
		return this.getSingle(result);
	}

	async patch(body: TResource | string, params?: any): Promise<TResource> {
		const request = getEditRequest(body);
		const result = await this.httpClient.patch(`${this.resourcePath}/${request.id}`, request.payload, this.mergeDefaultParams(params));
		return this.getSingle(result);
	}

	delete(id: any, params?: any): Promise<boolean> {
		if (typeof id !== 'string' && Boolean(id && id.id)) {
			id = id.id;
		}
		return this.httpClient.delete(`${this.resourcePath}/${id}`, this.mergeDefaultParams(params));
	}

	deleteAll(params?: any): Promise<boolean> {
		return this.httpClient.delete(`${this.resourcePath}`, this.mergeDefaultParams(params));
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

	async page(params?: any): Promise<PagedResult<TResource>> {
		const result = await this.httpClient.get(this.resourcePath, this.mergeDefaultParams(params));
		const items = this.getList(result);
		return getPagedResponse<TResource>(result, items);
	}
}

export interface IDownloadFileProvider {
	getDownloadRequestPath(id: string): string;
}
