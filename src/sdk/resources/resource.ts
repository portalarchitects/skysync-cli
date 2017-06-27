import { IEntityIdentifier } from '../models';
import { IHttpClient } from '../http';

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
		return this.mergeParams(params, this.defaultParams);
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

	async list(params?: any): Promise<TResource[]> {
		const result = await this.httpClient.get(this.resourcePath, this.mergeDefaultParams(params));
		return result && <TResource[]>result[this.pluralName];
	}

	async get(id: any, params?: any): Promise<TResource> {
		const result = await this.httpClient.get(`${this.resourcePath}/${id}`, this.mergeDefaultParams(params));
		return result && <TResource>result[this.singularName];
	}
}

export class EditableResource<TResource extends IEntityIdentifier<any>> extends Resource<TResource> {
	constructor(httpClient: IHttpClient, name: string);
	constructor(httpClient: IHttpClient, singularName: string, pluralName: string = undefined) {
		super(httpClient, singularName, pluralName);
	}

	async add(body: TResource, params?: any): Promise<TResource> {
		const result = await this.httpClient.post(`${this.resourcePath}`, body, this.mergeDefaultParams(params));
		return result && <TResource>result[this.singularName];
	}

	async update(body: TResource, params?: any): Promise<TResource> {
		const result = await this.httpClient.put(`${this.resourcePath}/${body.id}`, body, this.mergeDefaultParams(params));
		return result && <TResource>result[this.singularName];
	}

	async patch(body: TResource, params?: any): Promise<TResource> {
		const result = await this.httpClient.patch(`${this.resourcePath}/${body.id}`, body, this.mergeDefaultParams(params));
		return result && <TResource>result[this.singularName];
	}

	delete(id: any, params?: any): Promise<boolean> {
		return this.httpClient.delete(`${this.resourcePath}/${id}`, this.mergeDefaultParams(params));
	}
}
