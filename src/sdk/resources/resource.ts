import { IHttpClient } from '../http';
import { IEntityIdentifier } from '../models/base';

export function getTypedResponse<T>(result: any, type?: string): T {
	if (!type) {
		type = result && result.type;
	}
	return result && <T>result[type];
}

export class Resource<TResource> {
	protected resourcePath: string;
	public defaultParams: any;

	constructor(protected httpClient: IHttpClient, protected singularName: string, protected pluralName: string = undefined) {
		if (!this.pluralName) {
			this.pluralName = `${this.singularName}s`;
		}
		this.resourcePath = this.pluralName;
	}

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

	protected getList(result: any): TResource[] {
		return getTypedResponse<TResource[]>(result, this.pluralName);
	}
	
	protected getSingle(result: any): TResource {
		return getTypedResponse<TResource>(result, this.singularName);
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

export class EditableResource<TResource extends IEntityIdentifier<string>> extends Resource<TResource> {
	constructor(httpClient: IHttpClient, name: string);
	constructor(httpClient: IHttpClient, singularName: string, pluralName: string = undefined) {
		super(httpClient, singularName, pluralName);
	}

	async add(body: TResource, params?: any): Promise<TResource> {
		const result = await this.httpClient.post(`${this.resourcePath}`, body, this.mergeDefaultParams(params));
		return this.getSingle(result);
	}

	async update(body: TResource, params?: any): Promise<TResource> {
		const result = await this.httpClient.put(`${this.resourcePath}/${body.id}`, body, this.mergeDefaultParams(params));
		return this.getSingle(result);
	}

	async patch(body: TResource, params?: any): Promise<TResource> {
		const result = await this.httpClient.patch(`${this.resourcePath}/${body.id}`, body, this.mergeDefaultParams(params));
		return this.getSingle(result);
	}

	delete(id: any, params?: any): Promise<boolean> {
		return this.httpClient.delete(`${this.resourcePath}/${id}`, this.mergeDefaultParams(params));
	}

	deleteAll(params?: any): Promise<boolean> {
		return this.httpClient.delete(`${this.resourcePath}`, this.mergeDefaultParams(params));
	}
}
