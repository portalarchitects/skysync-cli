import { IHttpClient } from '../http';
import { PagedResource } from './resource';
import { AuditCategory } from '../models';

export class TransferAuditCategoriesResource extends PagedResource<AuditCategory> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'auditCategory', 'audit_category', 'auditCategories', 'audit_categories', 'transfers/categories');
	}
}
