import { IEntityIdentifier } from './base';

export interface ConnectionFeatures {
	[name: string]: any;
}

export interface StoragePlatform extends IEntityIdentifier<string> {
	name?: string;
	group?: 'cloud' | 'on-premise';
	features?: ConnectionFeatures;
}

export interface Connection extends IEntityIdentifier<string> {
	name?: string;
	features?: ConnectionFeatures;
	platform?: StoragePlatform;
	account?: Account;
	poolId?: string;
}

export interface Account extends IEntityIdentifier<string> {
	email?: string;
}

export interface ConnectionAuthorizeRequest {
	method: 'oauth2' | 'oauth' | 'prompt',
	target: string;
	prompt?: any;
}

export interface PlatformItemType {
	type?: string;
	id?: string;
	name?: string;
	caption?: string;
}

export interface PlatformItem {
	id?: string;
	name?: string;
	caption?: string;
	parent?: PlatformItem;
	item_type: PlatformItemType;
}
