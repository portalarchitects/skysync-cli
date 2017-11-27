import { IHttpClient } from '../http';
import { EditableResource } from './resource';
import { AuditCategory } from '../models';

export class AuditCategoriesResource extends EditableResource<AuditCategory> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'auditCategory', 'audit_category', 'auditCategories', 'audit_categories', 'transfers/categories');
	}
}
