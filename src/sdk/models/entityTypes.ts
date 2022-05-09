import { IAuditedEntity, IEntityIdentifier, IHaveLinks, ILinks, Link } from './base';
import { Category } from './categories';
import { MetadataCalculatedFilter } from './metadataFilters';

export interface EntityTypeLinks extends ILinks {
	clone?: Link;
	deleteNotInUse?: Link;
}

export interface EntityType extends IEntityIdentifier<string>, IAuditedEntity, IHaveLinks<EntityTypeLinks> {
	name?: string;
	description?: string;
	kind?: 'pattern' | 'block_list' | 'transform' | 'classifier' | string;
	category?: Category;
	threshold?: number;
	readonly?: boolean;
	disabled?: boolean;
}

export interface BlockListEntityType extends EntityType {
	kind: 'block_list';
	keywords?: EntityTypeDictionary;
}

export interface PatternEntityType extends EntityType {
	kind: 'pattern';
	keywords?: EntityTypeDictionary;
	negative_keywords?: EntityTypeDictionary;
	patterns?: EntityTypeRegexPattern[];
	validation?: string[];
}

export interface EntityTypeDictionary extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
	readonly?: boolean;
	elements?: EntityTypeDictionaryElement[];
	search_options?: EntityTypeDictionarySearchOptions;
}

export interface EntityTypeDictionarySearchOptions {
	backward?: number;
	forward?: number;
}

export interface EntityTypeDictionaryElement {
	element: string;
}

export interface EntityTypeRegexPattern {
	description: string;
	pattern: string;
	priority: number;
	confidence: ConfidenceLevel;
}

export enum ConfidenceLevel {
	None = 'none',
	VeryWeak = 'very_weak',
	Weak = 'weak',
	Medium = 'medium',
	Strong = 'strong',
	VeryStrong = 'very_strong'
}

export type EntityTypePropertyValue = {
	value: any;
	confidence?: number;
	keyword?: boolean;
	negative_keyword?: boolean;
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

export interface EntityTypeValidator extends IEntityIdentifier<string> {
	name?: string;
	description?: string;
	prompt?: any;
}

export enum DetectionMode {
	DetectValue = 'value',
	DetectExistence = 'exists',
	DetectFrequency = 'frequency'
}

export interface EntityTypeAssignment extends EntityType {
	priority?: number;
	threshold?: number;
	detection?: DetectionMode[];
	candidate?: MetadataCalculatedFilter;
}
