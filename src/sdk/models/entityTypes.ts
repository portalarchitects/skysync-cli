import { IAuditedEntity, IEntityIdentifier } from './base';
import { Category } from './categories';

export enum ConfidenceLevel {
	None = 'none',
	VeryWeak = 'very_weak',
	Weak = 'weak',
	Medium = 'medium',
	Strong = 'strong',
	VeryStrong = 'very_strong'
}
export interface EntityTypeRegexPattern {
    description: string;
    pattern: string;
    priority: number;
    confidence: ConfidenceLevel;
}

export interface EntityTypeKeyword {
	description: string;
	id: string;
	name: string;
	type: string;
}
export interface EntityType extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	kind?: 'pattern' | 'block_list' | 'transform' | 'classifier' | string;
	category?: Category;
	threshold?: number;
	readonly?: boolean;
	disabled?: boolean;
	patterns?: EntityTypeRegexPattern;
	keywords?: EntityTypeKeyword;
	validation?: string[];
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
