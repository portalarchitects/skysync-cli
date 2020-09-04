import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AuditCategory } from '../models';

export class PolicyAuditCategoriesResource extends PagedResource<AuditCategory> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'auditCategory', 'audit_category', 'auditCategories', 'audit_categories', 'policies/audit_categories');
	}
}
