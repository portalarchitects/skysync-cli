import { IHttpClient } from '../http';
import { PagedResource, IDownloadFileProvider } from './resource';
import { Profile } from '../models';

export class ProfilesResource extends PagedResource<Profile> implements IDownloadFileProvider {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'profile');
	}

	getDownloadRequestPath(id: string): string {
		return `${this.resourcePath}/${id}/download`;
	}
}
