import {
	IEntityIdentifier,
	Link,
	ILinks,
	IHaveLinks
} from './base';

export interface ConnectionFeatures {
	[name: string]: any;
}

export interface StoragePlatformLinks extends ILinks {
	icon?: Link;
	connect?: Link;
}

export interface PromptAttributeOption {
	caption?: string;
}

export interface PromptAttributeOptionList {
	[key: string]: PromptAttributeOption;
}

export interface PromptAttribute {
	type?: string;
	id?: string;
	caption?: string;
	hint?: string;
	required?: boolean;
	value?: any;
	options?: PromptAttributeOptionList;
}

export interface PromptAttributes {
	[name: string]: PromptAttribute;
}

export interface StoragePlatformPromptDimensions {
	width?: number;
	height?: number;
}

export interface ConnectionAuthorizePrompt {
	method: 'oauth2' | 'oauth' | 'prompt',
	target: string;
	prompt?: StoragePlatformPromptDimensions;
	attributes?: PromptAttributes;
}

export interface StoragePlatform extends IEntityIdentifier<string>, IHaveLinks<StoragePlatformLinks> {
	name?: string;
	group?: string;
	features?: ConnectionFeatures;
	authorize?: {
		prompt?: StoragePlatformPromptDimensions;
		methods?: string[];
	};
	path?: {
		validation?: any
	};
	disabled?: boolean;
	default?: boolean;
}

export interface PlatformItemHierarchyLinks extends ILinks {
	items?: Link;
}

export interface ConnectionLinks extends PlatformItemHierarchyLinks {
	edit?: Link;
}

export interface Connection extends IEntityIdentifier<string>, IHaveLinks<ConnectionLinks> {
	name?: string;
	features?: ConnectionFeatures;
	platform?: StoragePlatform;
	account?: Account;
	pool?: ConnectionPool;
	disabled?: boolean;
	auth?: any;
}

export interface Account extends IEntityIdentifier<string> {
	email?: string;
}

export interface ConnectionPool extends IEntityIdentifier<string> {
	name?: string;
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
