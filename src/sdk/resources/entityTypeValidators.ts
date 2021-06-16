import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { EntityTypeValidator } from '../models';

export class EntityTypeValidatorsResource extends PagedResource<EntityTypeValidator> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'entity_type_validator', 'entity_type_validator', 'entity_type_validators', 'entity_type_validators', 'entity_types/validators');
	}
}
