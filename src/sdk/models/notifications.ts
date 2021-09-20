import { IEntityIdentifier } from './base';

export interface NotificationType extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
}

export interface NotificationTypeCategory extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
	notifications?: NotificationType[];
}

export enum NotificationHandlerType {
	None = 'none',
	Email = 'email',
	Sms = 'sms',
	Webhook = 'webhook'
}

export interface NotificationHandler extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
	kind?: NotificationHandlerType;
	disabled?: boolean;
}

export interface NotificationPolicy extends IEntityIdentifier<string> {
	recipient?: string;
	handler?: string;
	notification_types: string[];
}

export interface SmtpConfiguration {
	from_address?: string;
	host?: string;
	password?: string;
	port?: number;
	username?: string;
}
