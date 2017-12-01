import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { RemoteSite } from '../models';
import { IDownloadFileProvider} from './resource';
import { FileDownloader} from '../../util/file-downloader';

export class SitesResource extends EditableResource<RemoteSite> implements IDownloadFileProvider {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'site');
	}

	download(id: string, outputDirectory: string): any {
		return new FileDownloader(this.httpClient, this)
			.download(id, outputDirectory);
	}
	
	getDownloadRequestPath(id: string): string {
		return `${this.resourcePath}/${id}/download`;
	}
}
