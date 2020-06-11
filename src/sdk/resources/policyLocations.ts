import { PolicyLocation } from '../models';
import { IHttpClient } from '../http';
import { PagedResource } from './resource';

export class PolicyLocationsResource extends PagedResource<PolicyLocation> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'location');
		this.resourcePath = 'policies/locations';
	}
}
