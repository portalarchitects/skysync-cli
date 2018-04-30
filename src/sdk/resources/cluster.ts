import { IHttpClient } from '../http';
import { BaseResource, IDownloadFileProvider } from './resource';

export class ClusterResource extends BaseResource implements IDownloadFileProvider {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	getDownloadRequestPath(): string {
		return `admin/cluster`;
	}
}
