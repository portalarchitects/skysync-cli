import { IHttpClient } from '../http';
import { PagedResource, IDownloadFileProvider } from './resource';
import { RemoteSite } from '../models';

export class SitesResource extends PagedResource<RemoteSite> implements IDownloadFileProvider {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'site');
	}

	getDownloadRequestPath(id: string): string {
		return `${this.resourcePath}/${id}/download`;
	}
}
