import { IHttpClient } from '../http';
import { EditableResource, IDownloadFileProvider } from './resource';
import { RemoteSite } from '../models';

export class SitesResource extends EditableResource<RemoteSite> implements IDownloadFileProvider {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'site');
	}

	getHttpClient(): any {
		return this.httpClient;
	}

	getDownloadRequestPath(id: string): string {
		return `${this.resourcePath}/${id}/download`;
	}
}
