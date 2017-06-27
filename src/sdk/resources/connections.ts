import { IHttpClient } from '../http';
import { Resource, EditableResource } from './resource';
import { StoragePlatform, Connection, ConnectionAuthorizeRequest } from '../models';

function getAuthorizeRequest(body: any): ConnectionAuthorizeRequest {
	const type = body.type;
	return body[type];
}

export class StoragePlatformsResource extends Resource<StoragePlatform> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'platform');
		this.resourcePath = 'connections/platforms';
	}

	async authorize(platform: string, params?: any): Promise<ConnectionAuthorizeRequest> {
		const response = await this.httpClient.get(`${this.resourcePath}/${platform}/new`, params);
		return getAuthorizeRequest(response);
	}
}

export class ConnectionsResource extends EditableResource<Connection> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'connection');
	}

	async authorize(platform: string, params?: any): Promise<ConnectionAuthorizeRequest> {
		const response = await this.httpClient.get(`${this.resourcePath}/platforms/${platform}/new`, params);
		return getAuthorizeRequest(response);
	}

	async edit(id: string, params?: any): Promise<ConnectionAuthorizeRequest> {
		const response = this.httpClient.get(`${this.resourcePath}/${id}/edit`, this.mergeDefaultParams(params));
		return getAuthorizeRequest(response);
	}
}
