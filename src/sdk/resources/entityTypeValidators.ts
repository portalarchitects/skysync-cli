import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { Validator } from '../models';

export class EntityTypeValidatorsResource extends PagedResource<Validator> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'entity_type_validator', 'entity_type_validator', 'entity_type_validators', 'entity_type_validators', 'entity_types/validators');
	}
}
