import { IEntityIdentifier } from './base';

export interface ConnectionFeatures {
	[name: string]: any;
};

export interface StoragePlatform extends IEntityIdentifier<string> {
	name?: string;
	group?: 'cloud' | 'on-premise';
	features?: ConnectionFeatures;
};

export interface Connection extends IEntityIdentifier<string> {
	name?: string;
	features?: ConnectionFeatures;
	platform?: StoragePlatform;
	account?: Account;
};

export interface Account extends IEntityIdentifier<string> {
	email?: string;
};

export interface ConnectionAuthorizeRequest {
	method: 'oauth2' | 'oauth' | 'prompt',
	target: string;
	prompt?: any;
};
