import { IHttpClient } from '../http';
import { getTypedResponse, Resource, PagedResource } from './resource';
import { StoragePlatform, Connection, ConnectionAuthorizeRequest } from '../models';

export class StoragePlatformsResource extends Resource<StoragePlatform> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'platform');
		this.resourcePath = 'connections/platforms';
	}

	async authorize(platform: string, params?: any): Promise<ConnectionAuthorizeRequest> {
		const response = await this.httpClient.get(`${this.resourcePath}/${platform}/new`, params);
		return getTypedResponse<ConnectionAuthorizeRequest>(response);
	}
}

export class ConnectionsResource extends PagedResource<Connection> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'connection');
	}

	async authorize(platform: string, params?: any): Promise<ConnectionAuthorizeRequest> {
		const response = await this.httpClient.get(`${this.resourcePath}/platforms/${platform}/new`, params);
		return getTypedResponse<ConnectionAuthorizeRequest>(response);
	}

	async edit(id: string, params?: any): Promise<ConnectionAuthorizeRequest> {
		const response = this.httpClient.get(`${this.resourcePath}/${id}/edit`, this.mergeDefaultParams(params));
		return getTypedResponse<ConnectionAuthorizeRequest>(response);
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
