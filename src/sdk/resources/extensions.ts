import { IHttpClient } from '../http';
import { CancellationToken } from '../cancellation-token';
import { Resource, PagedResult, getPagedResponse, getEditRequest, IDownloadFileProvider } from './resource';
import { Extension } from '../models';

export class ExtensionsResource extends Resource<Extension> implements IDownloadFileProvider {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'extension', null, null, null, 'admin/extensions');
	}

	getDownloadRequestPath(id: string): string {
		return `${this.resourcePath}/${id}/download`;
	}

	async page(params?: any, token?: CancellationToken): Promise<PagedResult<Extension>> {
		const result = await this.httpClient.get(this.resourcePath, this.mergeDefaultParams(params), token);
		const items = this.getList(result);
		return getPagedResponse<Extension>(result, items);
	}

	async add(body: Buffer | any, params?: any, token?: CancellationToken): Promise<Extension> {
		const result = await this.httpClient.upload(this.resourcePath, 'extension.nupkg', body, this.mergeDefaultParams(params), token);
		return this.getSingle(result);
	}
	
	async patch(body: Extension | string, params?: any, token?: CancellationToken): Promise<Extension> {
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
	
	async configure(id: any, configuration: any, params?: any, token?: CancellationToken): Promise<void> {
		if (typeof id !== 'string' && Boolean(id && id.id)) {
			id = id.id;
		}
		await this.httpClient.patch(`${this.resourcePath}/${id}/configure`, configuration, this.mergeDefaultParams(params), token);
	}
}
