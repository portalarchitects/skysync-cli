import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { EntityType } from '../models';

export class EntityTypesResource extends PagedResource<EntityType> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'entity_type');
	}
}
