import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Extractor, Suggestor } from '../models';

export class ExtractorResource extends PagedResource<Extractor> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'extractor', null, null, null, 'audits/extractors');
	}
}

export class SuggestorResource extends PagedResource<Suggestor> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'suggestor', null, null, null, 'audits/suggestors');
	}
}
