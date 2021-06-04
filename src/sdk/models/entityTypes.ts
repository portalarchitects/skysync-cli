import { IAuditedEntity, IEntityIdentifier } from './base';
import { Category } from './categories';

export interface EntityType extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	kind?: 'pattern' | 'block_list' | 'transform' | 'classifier' | string;
	category?: Category;
	threshold?: number;
	keywords?: EntityTypeDictionary;
	readonly?: boolean;
	disabled?: boolean;
}

export interface EntityTypeDictionary extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
	readonly?: boolean;
	elements?: EntityTypeDictionaryElement[];
}

export interface EntityTypeDictionaryElement {
	element: string;
}

export type EntityTypePropertyValue = {
	value: any;
	confidence?: number;
	keyword?: boolean;
	valid?: boolean;
	original_confidence?: number;
} | any;

export type EntityTypePropertyValues = {
	values: EntityTypePropertyValue[];
};

export interface EntityTypeEvaluationResult {
	id?: string;
	properties?: {
		[key: string]: EntityTypePropertyValues;
	};
}
