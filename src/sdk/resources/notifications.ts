import { IHttpClient } from '../http';
import { PagedResource, getTypedResponse } from './resource';
import {
	NotificationType,
	NotificationTypeCategory,
	NotificationHandler,
	NotificationPolicy,
	SmtpConfiguration
} from '../models';
import { CancellationToken } from '../cancellation-token';

export class NotificationsResource extends PagedResource<NotificationPolicy> {
	constructor(httpClient: IHttpClient) {
		super(httpClient, 'notification');
	}

	async handlers(params?: any, token?: CancellationToken): Promise<NotificationHandler[]> {
		const result = await this.httpClient.get(`${this.resourcePath}/handlers`, this.mergeDefaultParams(params), token);
		return getTypedResponse<NotificationHandler[]>(result);
	}

	async handler(id: string, params?: any, token?: CancellationToken): Promise<NotificationHandler> {
		const result = await this.httpClient.get(`${this.resourcePath}/handlers/${id}`, this.mergeDefaultParams(params), token);
		return getTypedResponse<NotificationHandler>(result);
	}

	async configureHandler(id: string, params?: any, token?: CancellationToken): Promise<NotificationHandler> {
		const result = await this.httpClient.patch(`${this.resourcePath}/handlers/${id}`, this.mergeDefaultParams(params), token);
		return getTypedResponse<NotificationHandler>(result);
	}

	async testHandler(id: string, params?: any, token?: CancellationToken): Promise<NotificationHandler> {
		const result = await this.httpClient.patch(`${this.resourcePath}/handlers/${id}/test`, this.mergeDefaultParams(params), token);
		return getTypedResponse<NotificationHandler>(result);
	}

	async categories(params?: any, token?: CancellationToken): Promise<NotificationTypeCategory[]> {
		const result = await this.httpClient.get(`${this.resourcePath}/categories`, this.mergeDefaultParams(params), token);
		return getTypedResponse<NotificationTypeCategory[]>(result);
	}

	async types(params?: any, token?: CancellationToken): Promise<NotificationType[]> {
		const result = await this.httpClient.get(`${this.resourcePath}/types`, this.mergeDefaultParams(params), token);
		return getTypedResponse<NotificationType[]>(result);
	}

	async getSmtpConfiguration(token?: CancellationToken): Promise<SmtpConfiguration> {
		const result = await this.httpClient.get(`${this.resourcePath}/handlers/email/configure`, token);
		return getTypedResponse<SmtpConfiguration>(result);
	}
}
