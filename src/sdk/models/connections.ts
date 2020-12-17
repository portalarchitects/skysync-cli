import {
	IEntityIdentifier,
	IAuditedEntity,
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
	method: 'oauth2' | 'oauth' | 'prompt';
	target: string;
	prompt?: StoragePlatformPromptDimensions;
	attributes?: PromptAttributes;
}

export interface IHaveConnectorFeatures extends IEntityIdentifier<string> {
	name?: string;
	features?: ConnectionFeatures;
	path?: {
		validation?: any;
	};
	disabled?: boolean;
}

export interface StoragePlatform extends IHaveConnectorFeatures, IHaveLinks<StoragePlatformLinks> {
	group?: string;
	authorize?: {
		prompt?: StoragePlatformPromptDimensions;
		methods?: string[];
	};
	default?: boolean;
}

export interface PlatformItemHierarchyLinks extends ILinks {
	items?: Link;
}

export interface ConnectionLinks extends PlatformItemHierarchyLinks {
	edit?: Link;
}

export interface Connection extends IHaveConnectorFeatures, IHaveLinks<ConnectionLinks>, IAuditedEntity {
	platform?: StoragePlatform;
	account?: Account;
	pool?: ConnectionPool;
	auth?: any;
}

export interface SecurityIdentifier extends IEntityIdentifier<string> {
	external_id?: string;
	admin?: boolean;
	built_in?: boolean;
	disabled?: boolean;
	readonly?: boolean;
}

export interface Group extends SecurityIdentifier {
	name?: string;
	caption?: string;
}

export interface Account extends SecurityIdentifier {
	email?: string;
	username?: string;
	given_name?: string;
	surname?: string;
	name?: string;
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

export interface PlatformItem extends IHaveLinks<PlatformItemHierarchyLinks> {
	id?: string;
	name?: string;
	caption?: string;
	parent?: PlatformItem;
	type?: string;
	item_type: PlatformItemType;
	bytes?: number;
	etag?: string;
	mime_type?: string;
	version?: string;
	hash?: string;
	is_hidden?: boolean;
	is_system?: boolean;
	is_shared?: boolean;
	size_estimate?: {
		count?: number;
		bytes?: number;
	};
	owner?: Account;
	content_created_on?: number;
	created_on?: number;
	created_by?: Account;
	content_modified_on?: number;
	modified_on?: number;
	modified_by?: Account;
	content_accessed_on?: number;
	accessed_on?: number;
	accessed_by?: Account;
	checkout_on?: number;
	checkout_by?: Account;
	[name: string]: any;
}
